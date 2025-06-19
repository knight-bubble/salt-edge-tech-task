import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RandomUser } from "@/types/domain/random-user";
import { InfoField } from "./info-field";

export const LocationInformationCard = ({ user }: { user: RandomUser }) => {
  const address = `${user.location.street.number} ${user.location.street.name}`;
  const cityState = `${user.location.city}, ${user.location.state} ${user.location.postcode}`;
  const coordinates = `${user.location.coordinates.latitude}, ${user.location.coordinates.longitude}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Address</p>
          <p>{address}</p>
          <p>{cityState}</p>
          <p>{user.location.country}</p>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <InfoField
            label="Coordinates"
            value={coordinates}
            className="text-xs"
          />
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Timezone
            </p>
            <p className="text-xs">{user.location.timezone.description}</p>
            <p className="text-xs">({user.location.timezone.offset})</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
