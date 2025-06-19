import type { RandomUser } from "./random-user";

export type RandomUserRow = {
  login: RandomUser["login"];
  name: RandomUser["name"];
  email: RandomUser["email"];
  picture: RandomUser["picture"];
};
