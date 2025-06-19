import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginFormOptions } from "@/form-options/login-form.options";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { PasswordInput } from "../ui/password-input";
import { useAppForm } from "../ui/tanstack-form";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const loginForm = useAppForm({
    ...loginFormOptions,
    onSubmit: async () => {
      navigate({ to: "/workspace" });
    },
  });

  const handleFillForm = () => {
    loginForm.setFieldValue("email", "john.smith@neuron.com");
    loginForm.setFieldValue("password", "12345678");

    loginForm.handleSubmit();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <loginForm.AppForm>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
            <CardAction>
              <Button onClick={handleFillForm} variant='outline' className='w-full'>
                Fill the form
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className='flex flex-col gap-6'>
                <loginForm.AppField name='email'>
                  {(field) => (
                    <field.FormItem>
                      <field.FormLabel>Email</field.FormLabel>
                      <field.FormControl>
                        <Input
                          placeholder='john.smith@neuron.com'
                          type='email'
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          autoComplete='email'
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                </loginForm.AppField>
                <loginForm.AppField name='password'>
                  {(field) => (
                    <field.FormItem>
                      <field.FormActionLabel
                        action={
                          <Link
                            className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                            to='/forgot-password'
                          >
                            Forgot password?
                          </Link>
                        }
                      >
                        Password
                      </field.FormActionLabel>
                      <field.FormControl>
                        <PasswordInput
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder='••••••••••••••••••'
                          autoComplete='current-password'
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                </loginForm.AppField>
                <div className='flex flex-col gap-3'>
                  <loginForm.SubmitButton label='Login' />
                  <Button variant='outline' className='w-full'>
                    Login with Google
                  </Button>
                </div>
              </div>
              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{" "}
                <a href='#' className='underline underline-offset-4'>
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </loginForm.AppForm>
      </Card>
    </div>
  );
}
