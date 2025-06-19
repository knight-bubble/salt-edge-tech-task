import { LoginSchema } from "@/schemas/login.scheme";
import type { LoginForm } from "@/types/forms/login-form";
import { formOptions } from "@tanstack/react-form";

const defaultValues: LoginForm = {
  email: "",
  password: "",
};

export const loginFormOptions = formOptions({
  defaultValues,
  validators: {
    onChange: LoginSchema,
  },
});
