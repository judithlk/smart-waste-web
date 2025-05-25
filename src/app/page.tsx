import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Login() {
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
            <p className="text-white text-lg mt-2">Waste Management System</p>
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
            <form className="space-y-6 w-[70%] flex flex-col  justify-center">
              <div className="space-y-2 w-full">
                <h1 className="text-base italic">Username</h1>
                <input
                  type="text"
                  className="text-base border border-gray-200 focus-visible:outline-0 px-2 py-1 rounded-sm placeholder:text-gray-300 w-[100%]"
                  placeholder="Admin username"
                />
              </div>
              <div className="space-y-2 w-full">
                <h1 className="text-base italic">Password</h1>
                <input
                  type="password"
                  className="text-base border border-gray-200 focus-visible:outline-0 px-2 py-1 rounded-sm placeholder:text-gray-300 w-[100%]"
                  placeholder="Admin password"
                />
              </div>
              
                <Button className="bg-main-green text-white font-semibold rounded-sm w-full">
                  Submit
                </Button>
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
