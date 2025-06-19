import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RandomUser } from "@/types/domain/random-user";
import { InfoField } from "./info-field";

export const AccountInformationCard = ({ user }: { user: RandomUser }) => (
  <Card>
    <CardHeader>
      <CardTitle>Account Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <InfoField label="Username" value={user.login.username} />
      <Separator />
      <div>
        <p className="text-sm font-medium text-muted-foreground">Registered</p>
        <p>{new Date(user.registered.date).toLocaleDateString()}</p>
        <p className="text-xs text-muted-foreground">
          {user.registered.age} years ago
        </p>
      </div>
    </CardContent>
  </Card>
);
