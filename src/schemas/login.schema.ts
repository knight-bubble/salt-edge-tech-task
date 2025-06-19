import { email, minLength, object, pipe, string } from "valibot";

export const LoginSchema = object({
  email: pipe(string(), email(), minLength(1, "Email is required")),
  password: pipe(
    string(),
    minLength(8, "Password must be at least 8 characters"),
  ),
});
