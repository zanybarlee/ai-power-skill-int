import Layout from "@/components/Layout";

const PostJob = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-forest-light rounded-lg p-6 border border-mint/10">
          <h1 className="text-2xl font-semibold text-white mb-4">Post a New Job</h1>
          <p className="text-white/80">
            Create a new job posting to start sourcing candidates.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PostJob;