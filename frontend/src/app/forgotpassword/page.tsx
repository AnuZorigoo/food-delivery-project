"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Must include uppercase, lowercase and a number"
      ),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "verify" | "password">("email");

  const [email, setEmail] = useState("");

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onEmailSubmit = (values: z.infer<typeof emailSchema>) => {
    setEmail(values.email);
    setStep("verify");
  };

  const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    console.log("RESET PASSWORD:", {
      email,
      password: values.password,
    });

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex w-full justify-center items-center gap-10 px-6">
      {step === "email" && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            className="space-y-4 w-[400px] flex flex-col"
          >
            <Button
              type="button"
              variant="outline"
              className="w-9"
              onClick={() => router.push("/login")}
            >
              <ChevronLeft />
            </Button>

            <div>
              <p className="text-[26px] font-semibold">Reset your password</p>
              <p className="text-[#71717A]">
                Enter your email to receive a reset link.
              </p>
            </div>

            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" variant="secondary">
              Send link
            </Button>

            <div className="flex gap-2 items-center">
              <p className="text-[#71717A]">Don’t have an account?</p>
              <Button
                type="button"
                variant="link"
                className="text-[#2563EB]"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === "verify" && (
        <div className="space-y-4 w-100 flex flex-col">
          <Button
            type="button"
            variant="outline"
            className="w-9"
            onClick={() => setStep("email")}
          >
            <ChevronLeft />
          </Button>

          <div>
            <p className="text-[26px] font-semibold">
              Please verify Your Email
            </p>
            <p className="text-[#71717A]">
              We just sent an email to <b>{email}</b> Click the link in the
              email to verify your account.
            </p>
          </div>

          <Button onClick={() => setStep("password")}>I’ve verified</Button>

          <Button
            variant="link"
            className="text-[#2563EB]"
            onClick={() => console.log("RESEND EMAIL")}
          >
            Resend email
          </Button>
        </div>
      )}

      {step === "password" && (
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="space-y-4 w-[400px] flex flex-col"
          >
            <Button
              type="button"
              variant="outline"
              className="w-9"
              onClick={() => setStep("verify")}
            >
              <ChevronLeft />
            </Button>

            <div>
              <p className="text-[26px] font-semibold">Create new password</p>
              <p className="text-[#71717A]">Choose a strong password.</p>
            </div>

            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create password
            </Button>
          </form>
        </Form>
      )}

      <img
        src="/Frame 1321316047.png"
        className="hidden md:block"
        alt="Forgot password illustration"
      />
    </div>
  );
}
