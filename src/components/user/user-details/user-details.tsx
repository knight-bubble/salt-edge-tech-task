import { randomUserQueryOptions } from "@/api/random-user.api";
import { ErrorPage } from "@/components/general/error-page";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { AccountInformationCard } from "./account-information-card";
import { LocationInformationCard } from "./location-information-card";
import { PersonalInformationCard } from "./personal-information-card";
import { UserProfileHeader } from "./user-profile-header";

export const UserDetails = () => {
  const { userId } = useParams({ from: "/workspace/users/$userId/" });
  const { data: user, error } = useQuery(randomUserQueryOptions(userId));

  if (error || !user) {
    return <ErrorPage />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <UserProfileHeader user={user} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonalInformationCard user={user} />
        <LocationInformationCard user={user} />
        <AccountInformationCard user={user} />
      </div>
    </div>
  );
};
