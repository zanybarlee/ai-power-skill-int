import Layout from "@/components/Layout";

const Settings = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-forest-light rounded-lg p-6 border border-mint/10">
          <h1 className="text-2xl font-semibold text-white mb-4">Settings</h1>
          <p className="text-white/80">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;