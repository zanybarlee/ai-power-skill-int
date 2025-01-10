import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { searchTalent } from "@/services/talentSearch";

interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  location: string;
  skills: string[];
  availability: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Frontend Developer",
    experience: "5 years",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    availability: "Immediate"
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Backend Developer",
    experience: "3 years",
    location: "New York, NY",
    skills: ["Node.js", "Python", "PostgreSQL"],
    availability: "2 weeks"
  },
  {
    id: "3",
    name: "Mike Johnson",
    role: "Full Stack Developer",
    experience: "7 years",
    location: "Austin, TX",
    skills: ["React", "Node.js", "MongoDB"],
    availability: "1 month"
  }
];

const Candidates = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === "all" || candidate.role === roleFilter;
    const matchesLocation = !locationFilter || candidate.location.includes(locationFilter);
    
    return matchesSearch && matchesRole && matchesLocation;
  });

  const handleTalentSearch = async () => {
    if (!searchTerm) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      const searchParams = {
        search_query: searchTerm,
        uen: "200311331R", // These could be stored in a configuration file or environment variables
        user_guid: "59884f68-8db5-4fe7-a0a3-baa466c1c808",
        session_id: `session-${Date.now()}`,
        context_id: `context-${Date.now()}`,
        search_id: `search-${Date.now()}`,
      };

      const result = await searchTalent(searchParams);
      
      toast({
        title: "Success",
        description: "Talent search completed successfully",
      });

      // Here you would typically update your candidates list with the new results
      console.log('Search results:', result);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search for talent",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-forest-light rounded-lg p-6 border border-mint/10">
          <h1 className="text-2xl font-semibold text-white mb-6">Candidate Search</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative md:col-span-2">
              <Input
                placeholder="Search by name or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-forest border-mint/20 text-white placeholder:text-white/50"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="bg-forest border-mint/20 text-white">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleTalentSearch}
              disabled={isSearching}
              className="bg-mint hover:bg-mint/90 text-forest flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search Talent
                </>
              )}
            </Button>
          </div>

          <ScrollArea className="h-[600px] rounded-md border border-mint/10">
            <Table>
              <TableHeader className="bg-forest">
                <TableRow>
                  <TableHead className="text-mint">Name</TableHead>
                  <TableHead className="text-mint">Role</TableHead>
                  <TableHead className="text-mint">Experience</TableHead>
                  <TableHead className="text-mint">Location</TableHead>
                  <TableHead className="text-mint">Skills</TableHead>
                  <TableHead className="text-mint">Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="hover:bg-forest border-mint/10">
                    <TableCell className="text-white">{candidate.name}</TableCell>
                    <TableCell className="text-white">{candidate.role}</TableCell>
                    <TableCell className="text-white">{candidate.experience}</TableCell>
                    <TableCell className="text-white">{candidate.location}</TableCell>
                    <TableCell className="text-white">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-mint/10 text-mint"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-white">{candidate.availability}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default Candidates;
