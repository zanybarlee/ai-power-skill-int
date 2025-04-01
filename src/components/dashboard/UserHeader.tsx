
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserHeaderProps {
  userId: string | null;
  userEmail: string | null;
  userAvatar: string | null;
}

export const UserHeader = ({ userId, userEmail, userAvatar }: UserHeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-right text-aptiv-gray-500 text-sm">
        <div>{new Date().toLocaleDateString()}</div>
        {userId && <div className="text-aptiv-gray-700 mt-1">User ID: {userId.substring(0, 8)}...</div>}
      </div>
      
      {userEmail && (
        <Avatar className="h-10 w-10">
          <AvatarImage src={userAvatar || ""} alt="User avatar" />
          <AvatarFallback className="bg-aptiv text-white">
            {userEmail ? userEmail[0].toUpperCase() : <User className="h-5 w-5" />}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
