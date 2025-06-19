import { SignupSchema } from "@/schemas/signup.schema";
import type { SignupForm } from "@/types/forms/signup-form";
import { formOptions } from "@tanstack/react-form";

const defaultValues: SignupForm = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

export const signupFormOptions = formOptions({
  defaultValues,
  validators: {
    onChange: SignupSchema,
  },
});
