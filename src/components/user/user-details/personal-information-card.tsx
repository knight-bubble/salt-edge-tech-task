import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RandomUser } from "@/types/domain/random-user";
import { InfoField } from "./info-field";

export const PersonalInformationCard = ({ user }: { user: RandomUser }) => (
  <Card>
    <CardHeader>
      <CardTitle>Personal Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InfoField label="Gender" value={user.gender} className="capitalize" />
        <InfoField label="Age" value={`${user.dob.age} years old`} />
        <InfoField
          label="Date of Birth"
          value={new Date(user.dob.date).toLocaleDateString()}
        />
        <InfoField label="Nationality" value={user.nat} className="uppercase" />
      </div>
      <Separator />
      <InfoField label="Phone" value={user.phone} />
      <InfoField label="Cell" value={user.cell} />
    </CardContent>
  </Card>
);
