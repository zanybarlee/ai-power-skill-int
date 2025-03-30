
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ManualJobForm } from "@/components/job-descriptions/ManualJobForm";

export const JobManualTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Job Entry</CardTitle>
        <CardDescription>
          Create a job description by filling in the form fields.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ManualJobForm />
      </CardContent>
    </Card>
  );
};
