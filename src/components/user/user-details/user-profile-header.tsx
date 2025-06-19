import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { RandomUser } from "@/types/domain/random-user";

export const UserProfileHeader = ({ user }: { user: RandomUser }) => {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const initials = `${user.name.first[0]}${user.name.last[0]}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.picture.large} alt={fullName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{fullName}</CardTitle>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">
              {user.location.city}, {user.location.country}
            </p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
