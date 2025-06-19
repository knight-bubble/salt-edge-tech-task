import { minLength, object, pipe, string } from "valibot";

export const ForgotPasswordSchema = object({
  email: pipe(string(), minLength(1, "Email is required")),
});
