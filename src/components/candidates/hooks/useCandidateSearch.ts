
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { DatabaseResult, SearchFormValues, Candidate } from "../types/searchTypes";
import { useForm } from "react-hook-form";
import { normalizeSkills } from "@/utils/candidateUtils";

export const useCandidateSearch = () => {
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm<SearchFormValues>({
    defaultValues: {
      searchName: "",
      searchLocation: "",
      searchSkill: "",
      minExperience: "",
    },
  });

  const searchCandidates = async (data: SearchFormValues) => {
    const { searchName, searchLocation, searchSkill, minExperience } = data;
    
    if (!searchName && !searchLocation && !searchSkill && !minExperience) {
      throw new Error("Please enter at least one search criterion");
    }

    console.log("Searching with criteria:", data);
    
    // Start with a query builder - query for all needed fields
    let query = supabase
      .from('cv_metadata')
      .select(`
        id, name, experience, location, skills, email, phone,
        education, cv_content, certifications, nationality,
        current_salary, expected_salary, notice_period
      `)
      .limit(20);
    
    // Add filters based on provided criteria
    if (searchName) {
      query = query.ilike('name', `%${searchName}%`);
    }
    
    if (searchLocation) {
      query = query.ilike('location', `%${searchLocation}%`);
    }
    
    if (minExperience && !isNaN(parseInt(minExperience))) {
      query = query.gte('experience', parseInt(minExperience));
    }
    
    // Skills is a JSON/JSONB array, so we need to use containedBy or special operators
    if (searchSkill) {
      // This assumes skills is stored as a JSON array
      query = query.contains('skills', [searchSkill]);
    }
    
    const { data: results, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log("Raw data from Supabase:", results);
    return (results || []) as DatabaseResult[];
  };

  const { data: searchResults, refetch, isLoading } = useQuery({
    queryKey: ['candidates', form.watch()],
    queryFn: () => searchCandidates(form.getValues()),
    enabled: false,
    retry: false,
  });

  const handleTalentSearch = async () => {
    const formValues = form.getValues();
    const hasAnyCriteria = Object.values(formValues).some(value => value !== "");
    
    if (!hasAnyCriteria) {
      toast({
        title: "Error",
        description: "Please enter at least one search criterion",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      await refetch();
      toast({
        title: "Success",
        description: "Search completed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to search for talent",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const formattedResults: Candidate[] = searchResults?.map((result): Candidate => ({
    id: result.id,
    name: result.name || 'Unknown',
    role: 'Not specified',
    experience: result.experience ? `${result.experience} years` : 'Not specified',
    location: result.location || 'Not specified',
    skills: normalizeSkills(result.skills),
    availability: 'Not specified',
    email: result.email || 'Not specified',
    phone: result.phone || 'Not specified',
    education: result.education || 'Not specified',
    cv_content: result.cv_content || 'Not available',
    certifications: normalizeSkills(result.certifications),
    nationality: result.nationality || undefined,
    current_salary: result.current_salary || undefined,
    expected_salary: result.expected_salary || undefined,
    notice_period: result.notice_period || undefined
  })) || [];

  return {
    form,
    isLoading,
    isSearching,
    formattedResults,
    handleTalentSearch
  };
};
