"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { SignupSchema } from "@/schemas";
import { signup } from "@/actions/auth";
import { useState, useTransition } from "react";
import GithubLogin from "@/components/github-login";
import GoogleLogin from "@/components/google-login";
import { PasswordStrengthIndicator } from "./password-strength-indicator";
import { validatePassword } from "@/lib/password-validation";

export default function SignupForm() {
  const [pending, setPending] = useTransition();
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      tier: "freeTierUser",
    },
    mode: "onChange", // Enable real-time validation
  });

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    setFormError("");
    setFormSuccess("");

    // Validate password before submission
    const passwordValidation = validatePassword(values.password);
    if (!passwordValidation.isValid) {
      setFormError(passwordValidation.errors[0]);
      return;
    }

    setPending(() => {
      signup(values).then((data) => {
        if (data?.error) {
          setFormError(data.error);
        } else if (data?.success) {
          setFormSuccess(data.success);
          form.reset(); // Reset form on success
        }
      });
    });
  };

  return (
    <Card className="mx-auto max-w-md shadow-none border-none bg-transparent text-gray-800 h-[calc(100vh-100px)]">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription className="text-gray-600">
          Enter your information to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={pending}
                      className="placeholder:text-gray-400 focus:border-gray-500 border-gray-800"
                      placeholder="John Doe"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="placeholder:text-gray-400 focus:border-gray-500 border-gray-800"
                      type="email"
                      placeholder="johndoe@email.com"
                      disabled={pending}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={pending}
                      type="password"
                      className="placeholder:text-gray-400 focus:border-gray-500 border-gray-800"
                      placeholder="••••••••"
                      required
                    />
                  </FormControl>
                  <PasswordStrengthIndicator password={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {formError && <FormError message={formError} />}
            {formSuccess && <FormSuccess message={formSuccess} />}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
              disabled={pending || !form.formState.isValid}
            >
              {pending ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-2 my-6">
          <Separator className="flex-1" />
          <span className="text-gray-500 text-sm">or continue with</span>
          <Separator className="flex-1" />
        </div>

        <div className="flex gap-4 justify-center items-center">
          <GithubLogin />
          <GoogleLogin />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 hover:text-purple-500 font-medium"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
