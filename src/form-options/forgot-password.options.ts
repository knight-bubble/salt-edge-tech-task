import { ForgotPasswordSchema } from "@/schemas/forgot-apssword.schema";
import type { ForgotPasswordForm } from "@/types/forms/forgot-password";
import { formOptions } from "@tanstack/react-form";

const defaultValues: ForgotPasswordForm = {
  email: "",
};

export const forgotPasswordFormOptions = formOptions({
  defaultValues,
  validators: {
    onChange: ForgotPasswordSchema,
  },
});
