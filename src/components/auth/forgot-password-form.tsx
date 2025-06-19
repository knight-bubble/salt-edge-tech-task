import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { forgotPasswordFormOptions } from "@/form-options/forgot-password.options";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useAppForm } from "../ui/tanstack-form";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const forgotPasswordForm = useAppForm({
    ...forgotPasswordFormOptions,
    onSubmit: ({ value }) => {
      console.log(value);
      navigate({ to: "/" });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <forgotPasswordForm.AppForm>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email below to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <forgotPasswordForm.AppField name="email">
                  {(field) => (
                    <field.FormItem>
                      <field.FormLabel>Email</field.FormLabel>
                      <field.FormControl>
                        <Input
                          type="email"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                </forgotPasswordForm.AppField>
                <div className="flex flex-col gap-3">
                  <forgotPasswordForm.SubmitButton label="Reset Password" />
                </div>
              </div>
            </form>
          </CardContent>
        </forgotPasswordForm.AppForm>
      </Card>
    </div>
  );
}
