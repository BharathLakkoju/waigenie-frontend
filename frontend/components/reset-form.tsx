"use client";
import { login, reset } from "@/actions/auth";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResetSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useRouter } from "next/navigation";

export default function ResetForm() {
  const [pending, setPending] = useTransition();
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const router = useRouter();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setFormError("");
    setFormSuccess("");
    setPending(() => {
      reset(values).then((data) => {
        setFormError(data?.error);
        setFormSuccess(data?.success);
      });
    });
  };
  return (
    <>
      <Card className="mx-auto max-w-md shadow-none bg-transparent border-none text-gray-800 h-[calc(100vh-100px)]">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot your Password?</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your Email and new Password to reset your Password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
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
                            disabled={pending}
                            className="placeholder:text-gray-400 focus:border-gray-500"
                            id="email"
                            type="email"
                            placeholder="johndoe@email.com"
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2 mb-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={pending}
                            id="password"
                            type="password"
                            placeholder="******"
                            className="placeholder:text-gray-400 focus:border-gray-500"
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={formError} />
                <FormSuccess message={formSuccess} />
                <Button variant="outline" type="submit" className="">
                  Reset Password
                </Button>
              </div>
            </form>
          </Form>
          <Separator className="my-4" />
          <Button className="w-full" onClick={() => router.push("/login")}>
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
