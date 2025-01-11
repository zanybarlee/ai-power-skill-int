import Layout from "@/components/Layout";

const Settings = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg p-6 border border-aptiv/10">
          <h1 className="text-2xl font-semibold text-aptiv-gray-700 mb-6">Settings</h1>
          <p className="text-aptiv-gray-600">
            Manage your account settings and preferences.
          </p>
          <div className="mt-8 space-y-6">
            <div className="border-b border-aptiv/10 pb-6">
              <h2 className="text-lg font-medium text-aptiv-gray-700 mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-aptiv-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-aptiv/20 rounded-md text-aptiv-gray-700"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-aptiv-gray-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-aptiv/20 rounded-md text-aptiv-gray-700"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-aptiv/10 pb-6">
              <h2 className="text-lg font-medium text-aptiv-gray-700 mb-4">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-aptiv-gray-700">Email Notifications</h3>
                    <p className="text-sm text-aptiv-gray-500">Receive email updates about your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-aptiv-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aptiv/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aptiv"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-aptiv-gray-700 mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-aptiv-gray-600 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-aptiv/20 rounded-md text-aptiv-gray-700"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-aptiv-gray-600 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-aptiv/20 rounded-md text-aptiv-gray-700"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button className="px-4 py-2 bg-aptiv text-white rounded-md hover:bg-aptiv/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;