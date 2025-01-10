import Layout from "@/components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const jobFormSchema = z.object({
  title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select a job type.",
  }),
  experience: z.string({
    required_error: "Please select an experience level.",
  }),
  salary: z.object({
    min: z.string().min(1, { message: "Minimum salary is required" }),
    max: z.string().min(1, { message: "Maximum salary is required" }),
  }),
  description: z.string().min(50, {
    message: "Job description must be at least 50 characters.",
  }),
  requirements: z.string().min(30, {
    message: "Job requirements must be at least 30 characters.",
  }),
  benefits: z.string().min(20, {
    message: "Benefits must be at least 20 characters.",
  }),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

const defaultValues: Partial<JobFormValues> = {
  title: "",
  company: "",
  location: "",
  type: "",
  experience: "",
  salary: {
    min: "",
    max: "",
  },
  description: "",
  requirements: "",
  benefits: "",
};

const PostJob = () => {
  const { toast } = useToast();
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });

  function onSubmit(data: JobFormValues) {
    console.log(data);
    toast({
      title: "Job Posted Successfully",
      description: "Your job posting has been created and is now live.",
    });
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-forest-light rounded-lg p-6 border border-mint/10">
          <h1 className="text-2xl font-semibold text-white mb-4">Post a New Job</h1>
          <p className="text-white/80 mb-6">
            Create a detailed job posting to attract the best candidates.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Senior Software Engineer" {...field} className="bg-forest border-mint/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Tech Solutions Inc." {...field} className="bg-forest border-mint/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. San Francisco, CA (Remote)" {...field} className="bg-forest border-mint/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Job Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-forest border-mint/20">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Experience Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-forest border-mint/20">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                          <SelectItem value="lead">Lead / Manager</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel className="text-white">Salary Range</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="salary.min"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Min salary"
                              {...field}
                              className="bg-forest border-mint/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salary.max"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Max salary"
                              {...field}
                              className="bg-forest border-mint/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a detailed description of the role, responsibilities, and expectations..."
                        className="min-h-[150px] bg-forest border-mint/20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-white/60">
                      Minimum 50 characters. Be specific about the role and its responsibilities.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List the required skills, qualifications, and experience..."
                        className="min-h-[100px] bg-forest border-mint/20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-white/60">
                      Minimum 30 characters. List both required and preferred qualifications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Benefits</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the benefits and perks offered with this position..."
                        className="min-h-[100px] bg-forest border-mint/20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-white/60">
                      Minimum 20 characters. Include both monetary and non-monetary benefits.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-mint text-forest hover:bg-mint/90">
                Post Job
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default PostJob;