import { Link } from "@tanstack/react-router";

export const UserErrorDetails = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
          Not Found
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Oops, it looks like the user you're looking for is not available.
        </p>
        <div className="mt-6">
          <Link
            to="/workspace/users"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Users
          </Link>
        </div>
      </div>
    </div>
  );
};
