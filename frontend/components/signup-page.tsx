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
} from "@/components/ui/form";
import z from "zod";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { SignupSchema } from "@/schemas";
import { signup } from "@/actions/auth";
import { useState, useTransition } from "react";
import GithubLogin from "@/components/github-login";
import GoogleLogin from "@/components/google-login";

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
    },
  });
  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    setFormError("");
    setFormSuccess("");
    setPending(() => {
      signup(values).then((data) => {
        setFormError(data?.error);
        setFormSuccess(data?.success);
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
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
                          id="name"
                          placeholder="John Doe"
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
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
                          id="email"
                          type="email"
                          placeholder="johndoe@email.com"
                          disabled={pending}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="password"
                            disabled={pending}
                            type="password"
                            className="placeholder:text-gray-400 focus:border-gray-500 border-gray-800"
                            placeholder="******"
                            required
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={formError} />
              <FormSuccess message={formSuccess} />
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
          </form>
        </Form>
        <div className="flex justify-around my-4">
          <Separator className="my-4 w-1/3 bg-black" />
          <span className="">or</span>
          <Separator className="my-4 w-1/3 bg-black" />
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <GithubLogin />
          <GoogleLogin />
        </div>
        <Separator className="my-4" />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 underline underline-offset-4"
          >
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
