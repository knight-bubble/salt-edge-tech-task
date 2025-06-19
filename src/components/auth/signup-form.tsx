import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signupFormOptions } from "@/form-options/signup-form.options";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useAppForm } from "../ui/tanstack-form";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const signupForm = useAppForm({
    ...signupFormOptions,
    onSubmit: async ({ value }) => {
      console.log(value);
      navigate({ to: "/workspace/dashboard" });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <signupForm.AppForm>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>Enter your email below to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className='flex flex-col gap-6'>
                <signupForm.AppField name='email'>
                  {(field) => (
                    <field.FormItem>
                      <field.FormLabel>Email</field.FormLabel>
                      <field.FormControl>
                        <Input
                          type='email'
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                </signupForm.AppField>
                <signupForm.AppField name='password'>
                  {(field) => (
                    <field.FormItem>
                      <field.FormLabel>Password</field.FormLabel>
                      <field.FormControl>
                        <Input
                          type='password'
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                </signupForm.AppField>
                <signupForm.AppField name='confirmPassword'>
                  {(field) => (
                    <field.FormItem>
                      <field.FormLabel>Confirm Password</field.FormLabel>
                      <field.FormControl>
                        <Input
                          type='password'
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                </signupForm.AppField>
                <signupForm.AppField name='firstName'>
                  {(field) => (
                    <field.FormItem>
                      <field.FormLabel>First Name</field.FormLabel>
                      <field.FormControl>
                        <Input
                          type='text'
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                </signupForm.AppField>
                <signupForm.AppField name='lastName'>
                  {(field) => (
                    <field.FormItem>
                      <field.FormLabel>Last Name</field.FormLabel>
                      <field.FormControl>
                        <Input
                          type='text'
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                    </field.FormItem>
                  )}
                </signupForm.AppField>

                <div className='flex flex-col gap-3'>
                  <signupForm.SubmitButton label='Signup' />
                </div>
              </div>
            </form>
          </CardContent>
        </signupForm.AppForm>
      </Card>
    </div>
  );
}
