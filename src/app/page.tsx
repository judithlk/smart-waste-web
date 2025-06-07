"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClipLoader } from "react-spinners";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { adminLogin } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Invalid username",
    })
    .max(50, {
      message: "Invalid username",
    }),
  password: z.string().min(8, {
    message: "Invalid password",
  }),
});

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  setLoading(true);
  try {
    const data = await adminLogin(values.username, values.password);
    
    // Save token to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("admin", JSON.stringify(data.admin))
    
    router.push("/dashboard");
  } catch (err: any) {
    setError(err.message || "Login failed");
  }
  setLoading(false);
};


  return (
    <>
      <div className="w-[100%] flex">
        <div className="relative w-[65%] h-screen">
          {/* Background Image */}
          <Image
            src="/images/coverimage.jpg"
            alt="Cover"
            fill
            className="object-cover"
            priority
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* Content on top */}
          <div className="absolute inset-0 flex flex-col justify-end ml-[15%] mb-20 z-20">
            <h1 className="text-white text-3xl font-bold">SMART WASTERS</h1>
            <p className="text-white text-lg mt-2">Waste Management System - Dashboard</p>
          </div>
        </div>
        <div className="w-[35%] h-screen flex flex-col items-center justify-center">
          <div className="p-10 space-y-8 w-full pl-[20%]">
            <div className="space-y-2">
              <h2 className="font-bold text-xl">Welcome Back, Admin</h2>
              <h2 className="text-sm text-gray-400 font-300">
                Enter your username and password to log in.
              </h2>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-[70%] flex flex-col  justify-center"
              >
                <div className="space-y-2 w-full">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-[400]">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-base border border-gray-200 focus-visible:outline-0 px-2 py-1 rounded-sm placeholder:text-gray-400 w-[100%]"
                            placeholder="Admin username"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 w-full">
                  <div>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-[400]">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              className="text-base border border-gray-200 focus-visible:outline-0 px-2 py-1 rounded-sm placeholder:text-gray-400 w-[100%]"
                              placeholder="Admin password"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {loading ? <Button
                  type="submit"
                  disabled className="bg-main-green text-white font-semibold rounded-sm w-full"
                >
                  <ClipLoader size={20} color="#FFF" />
                </Button> : <Button
                  type="submit"
                  className="bg-main-green text-white font-semibold rounded-sm w-full"
                >
                  Login
                </Button>}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
