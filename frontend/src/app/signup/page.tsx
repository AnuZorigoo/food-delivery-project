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
import { useAuth } from "../(client)/context/AuthProvider";

const emailSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Must include uppercase, lowercase and a number",
      ),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function SignupPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { username: "", email: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onEmailSubmit = (values: z.infer<typeof emailSchema>) => {
    setServerError("");
    setUsername(values.username);
    setEmail(values.email);
    setStep("password");
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    setServerError("");
    setIsSubmitting(true);

    try {
      await register(username, email, values.password); // ✅ username нэмэгдсэн
      router.push("/login");
    } catch (err: any) {
      console.error("Register failed:", err);
      setServerError(
        err?.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full justify-center items-center gap-10 px-6">
      {step === "email" && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            className="space-y-4 w-[400px] flex flex-col"
          >
            <div>
              <p className="text-[26px] font-semibold">Create your account</p>
              <p className="text-[#71717A]">
                Sign up to explore your favorite dishes.
              </p>
            </div>

            {/* ✅ Username field */}
            <FormField
              control={emailForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Choose a username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email field */}
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

            {serverError && (
              <p className="text-sm text-red-500">{serverError}</p>
            )}

            <Button type="submit" className="w-full" variant="secondary">
              Continue
            </Button>

            <div className="flex gap-2 items-center">
              <p className="text-[#71717A]">Already have an account?</p>
              <Button
                type="button"
                variant="link"
                className="text-[#2563EB]"
                onClick={() => router.push("/login")}
              >
                Log in
              </Button>
            </div>
          </form>
        </Form>
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
              onClick={() => setStep("email")}
              disabled={isSubmitting}
            >
              <ChevronLeft />
            </Button>

            <div>
              <p className="text-[26px] font-semibold">Create a password</p>
              <p className="text-[#71717A]">
                Create a strong password with letters and numbers.
              </p>
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

            {serverError && (
              <p className="text-sm text-red-500">{serverError}</p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create account"}
            </Button>

            <div className="flex gap-2 items-center">
              <p className="text-[#71717A]">Already have an account?</p>
              <Button
                type="button"
                variant="link"
                className="text-[#2563EB]"
                onClick={() => router.push("/login")}
              >
                Log in
              </Button>
            </div>
          </form>
        </Form>
      )}

      <img
        src="/Frame 1321316047.png"
        className="hidden md:block"
        alt="Signup illustration"
      />
    </div>
  );
}
