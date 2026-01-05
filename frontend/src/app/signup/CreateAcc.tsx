"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
});

export const CreateAcc = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex w-full justify-center items-center gap-10">
      <Form {...form}>
        <form className="space-y-4 w-104 flex flex-col gap-1">
          <Button variant="secondary" className="w-9">
            {" "}
            <ChevronLeft />{" "}
          </Button>
          <p className="font-semibold text-[26px]">Create your account</p>
          <p className="text-[16px] text-[#71717A]">
            Sign up to explore your favorite dishes.
          </p>
          <FormField
            control={form.control}
            name="email"
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

          <Button variant="secondary" className="w-full">
            Let's go
          </Button>
          <div className="flex gap-2 items-center">
            <p className="text-[#71717A]">Already have an account?</p>
            <Button variant="link" className="text-[#2563EB]">
              Log in
            </Button>
          </div>
        </form>
      </Form>

      <img src="/Frame 1321316047.png" className="pt-25" />
    </div>
  );
};
