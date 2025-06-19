import { randomUserQueryOptions } from "@/api/random-user.api";
import { ErrorPage } from "@/components/general/error-page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export const UserDetails = () => {
  const { userId } = useParams({ from: "/workspace/users/$userId/" });
  const { data: user, isLoading, error } = useQuery(randomUserQueryOptions(userId));

  if (isLoading) {
    return (
      <div className='container mx-auto p-6 space-y-6'>
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-20 w-20 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[200px]' />
            <Skeleton className='h-4 w-[150px]' />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Skeleton className='h-[200px] w-full' />
          <Skeleton className='h-[200px] w-full' />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!user) {
    return <ErrorPage />;
  }

  return (
    <div className='container mx-auto p-6 space-y-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center space-x-6'>
            <Avatar className='h-20 w-20'>
              <AvatarImage src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
              <AvatarFallback>
                {user.name.first[0]}
                {user.name.last[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className='text-2xl'>
                {user.name.title} {user.name.first} {user.name.last}
              </CardTitle>
              <p className='text-muted-foreground'>{user.email}</p>
              <p className='text-sm text-muted-foreground'>
                {user.location.city}, {user.location.country}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Gender</p>
                <p className='capitalize'>{user.gender}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Age</p>
                <p>{user.dob.age} years old</p>
              </div>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Date of Birth</p>
                <p>{new Date(user.dob.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Nationality</p>
                <p className='uppercase'>{user.nat}</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Phone</p>
              <p>{user.phone}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Cell</p>
              <p>{user.cell}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Address</p>
              <p>
                {user.location.street.number} {user.location.street.name}
              </p>
              <p>
                {user.location.city}, {user.location.state} {user.location.postcode}
              </p>
              <p>{user.location.country}</p>
            </div>
            <Separator />
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Coordinates</p>
                <p className='text-xs'>
                  {user.location.coordinates.latitude}, {user.location.coordinates.longitude}
                </p>
              </div>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Timezone</p>
                <p className='text-xs'>{user.location.timezone.description}</p>
                <p className='text-xs'>({user.location.timezone.offset})</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Username</p>
              <p>{user.login.username}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>User ID</p>
              <p className='text-xs font-mono'>{user.login.uuid}</p>
            </div>
            <Separator />
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Registered</p>
              <p>{new Date(user.registered.date).toLocaleDateString()}</p>
              <p className='text-xs text-muted-foreground'>{user.registered.age} years ago</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>ID</p>
              <p className='text-xs font-mono'>
                {user.id.name}: {user.id.value}
              </p>
            </div>
            <Separator />
            <div className='space-y-2'>
              <p className='text-sm font-medium text-muted-foreground'>Password Hashes</p>
              <div className='space-y-1'>
                <p className='text-xs font-mono'>MD5: {user.login.md5}</p>
                <p className='text-xs font-mono'>SHA1: {user.login.sha1}</p>
                <p className='text-xs font-mono'>SHA256: {user.login.sha256}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
