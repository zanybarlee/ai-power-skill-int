import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Moon, User, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Settings */}
        <Card className="border-mint/10 bg-forest-light">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-mint" />
              <CardTitle className="text-lg font-semibold text-white">Profile Settings</CardTitle>
            </div>
            <CardDescription className="text-white/60">
              Manage your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input id="name" placeholder="John Doe" className="bg-forest border-mint/10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="bg-forest border-mint/10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-white">Timezone</Label>
              <Select>
                <SelectTrigger className="bg-forest border-mint/10">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                  <SelectItem value="pst">PST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-mint/10 bg-forest-light">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-mint" />
              <CardTitle className="text-lg font-semibold text-white">Notifications</CardTitle>
            </div>
            <CardDescription className="text-white/60">
              Configure how you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Email Notifications</Label>
                <p className="text-sm text-white/60">Receive notifications via email</p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Push Notifications</Label>
                <p className="text-sm text-white/60">Receive push notifications</p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-mint/10 bg-forest-light">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Moon className="h-5 w-5 text-mint" />
              <CardTitle className="text-lg font-semibold text-white">Appearance</CardTitle>
            </div>
            <CardDescription className="text-white/60">
              Customize your interface preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Dark Mode</Label>
                <p className="text-sm text-white/60">Toggle dark mode theme</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-mint/10 bg-forest-light">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-mint" />
              <CardTitle className="text-lg font-semibold text-white">Security</CardTitle>
            </div>
            <CardDescription className="text-white/60">
              Manage your security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-white">Current Password</Label>
              <Input id="current-password" type="password" className="bg-forest border-mint/10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-white">New Password</Label>
              <Input id="new-password" type="password" className="bg-forest border-mint/10" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="border-mint/10 text-white hover:bg-forest-light">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-mint text-forest hover:bg-mint/90">
            Save Changes
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;