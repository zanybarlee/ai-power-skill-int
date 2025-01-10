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
  salary: z.string().min(1, {
    message: "Salary is required.",
  }),
  description: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

const defaultValues: Partial<JobFormValues> = {
  title: "",
  company: "",
  location: "",
  salary: "",
  description: "",
};

const PostJob = () => {
  const { toast } = useToast();
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });

  function onSubmit(data: JobFormValues) {
    toast({
      title: "Job Posted Successfully",
      description: "Your job posting has been created.",
    });
    console.log(data);
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-forest-light rounded-lg p-6 border border-mint/10">
          <h1 className="text-2xl font-semibold text-white mb-4">Post a New Job</h1>
          <p className="text-white/80 mb-6">
            Create a new job posting to start sourcing candidates.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Software Engineer" {...field} className="bg-forest border-mint/20" />
                    </FormControl>
                    <FormDescription className="text-white/60">
                      The title of the position you're hiring for.
                    </FormDescription>
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
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Salary Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $120,000 - $150,000" {...field} className="bg-forest border-mint/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the full job description..."
                        className="min-h-[200px] bg-forest border-mint/20"
                        {...field}
                      />
                    </FormControl>
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