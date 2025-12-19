"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z, { email } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Тусгай тэмдэгт болон том жижиг үсэг оруулна уу"
    ),
});

export default function LogInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  return (
    <div className="flex w-full justify-center items-center gap-10">
      <Form {...form}>
        <form className="space-y-4 w-104 flex flex-col gap-1">
          <p className="font-semibold text-[26px]">Log In</p>
          <p className="text-[16px] text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>

                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-[26px]"></FormLabel>

                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>

                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="link"
            className="flex justify-start pl-0 underline"
            onClick={() => router.push("/forgotpassword")}
          >
            Forgot password?
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            type="button"
            onClick={() => router.push("/")}
          >
            Let's go
          </Button>
          <div className="flex gap-2 items-center">
            <p className="text-[#71717A]">Don't have an account? </p>
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

      <img src="/Frame 1321316047.png" className="pt-25" />
    </div>
  );
}
