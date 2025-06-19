import { useMatches } from "@tanstack/react-router";

export const useBreadcrumbs = () => {
  const matches = useMatches();
  const breadcrumbs = matches
    .filter((match) => match.loaderData && "title" in match.loaderData)
    .map(({ pathname, loaderData }) => {
      return {
        title: loaderData?.title,
        path: pathname,
      };
    });
  return breadcrumbs;
};
