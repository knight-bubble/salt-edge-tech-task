import { email, forward, minLength, object, partialCheck, pipe, string } from "valibot";

export const SignupSchema = pipe(
  object({
    email: pipe(string(), email(), minLength(1, "Email is required")),
    password: pipe(string(), minLength(8, "Password must be at least 8 characters")),
    confirmPassword: pipe(string(), minLength(8, "Password must be at least 8 characters")),
    firstName: pipe(string(), minLength(1, "First name is required")),
    lastName: pipe(string(), minLength(1, "Last name is required")),
  }),
  forward(
    partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "Passwords do not match"
    ),
    ["confirmPassword"]
  )
);
