import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <>
      <div className="w-[100%] flex">
        <div className="w-[60%] h-screen bg-main-green">
          <h1>Hello</h1>
        </div>
        <div className="w-[40%] h-screen flex flex-col items-center justify-center">
          <div className="border rounded-md p-10 space-y-4">
            <h2>Login to SMART WASTERS Dashboard</h2>
            <form className="space-y-3">
              <div className="space-y-2">
                <h1>User ID</h1>
                <input
                  type="text"
                  className="border border-gray-200 focus-visible:outline-0 px-2 rounded-sm"
                />
              </div>
              <div className="space-y-2">
                <h1>Password</h1>
                <input
                  type="password"
                  className="border border-gray-200 focus-visible:outline-0 px-2 rounded-sm"
                />
              </div>
              <div>
                <Button className="bg-sub-yellow text-white font-semibold rounded-sm">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
