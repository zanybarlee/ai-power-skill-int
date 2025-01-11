import Layout from "@/components/Layout";

const PostJob = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg p-6 border border-aptiv/10">
          <h1 className="text-2xl font-semibold text-aptiv-gray-700 mb-6">Post a New Job</h1>
          <p className="text-aptiv-gray-600">
            Create a new job posting to find the perfect candidate.
          </p>
          {/* Add job posting form here */}
        </div>
      </div>
    </Layout>
  );
};

export default PostJob;