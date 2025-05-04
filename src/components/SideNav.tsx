"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LuLayoutDashboard, LuTrash2 } from "react-icons/lu";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-[15%] h-screen p-3 flex flex-col justify-between border-r border-gray-200">
      <div className="space-y-3">
        <div>
          <h2 className="text-[2rem]">Smart Wasters</h2>
        </div>
        <Link href="/dashboard/" className="block">
          <div className={`p-2 ${pathname === "/dashboard" ? "bg-white" : ""} hover:bg-main-green rounded-sm hover:text-white flex items-center space-x-2`}>
            <div className="rounded-full bg-main-green hover:bg-none p-1">
            <LuLayoutDashboard className="size-5" />
            </div>
            <h2>Dashboard</h2>
          </div>
        </Link>
        <Link href="/dashboard/bin-management">
          <div className={`p-2 ${pathname === "/dashboard/bin-management" ? "bg-white" : ""} hover:bg-main-green rounded-sm hover:text-white flex items-center space-x-2`}>
          <div className="rounded-full bg-main-green hover:bg-none p-1"><LuTrash2 className="size-5" /></div>
            <h2>Bin Management</h2>
          </div>
        </Link>
        <Link href="/dashboard/schedule-management">
          <div className={`p-2 ${pathname === "/dashboard/schedule-management" ? "bg-white" : ""} hover:bg-main-green rounded-sm hover:text-white flex items-center space-x-2`}>
          <div className="rounded-full bg-main-green hover:bg-none p-1"><RiCalendarScheduleLine className="size-5" /></div>
            <h2>Scheduling</h2>
          </div>
        </Link>
        <Link href="/dashboard/personnel-management">
          <div className={`p-2 ${pathname === "/dashboard/personnel-management" ? "bg-white" : ""} hover:bg-main-green rounded-sm hover:text-white flex items-center space-x-2`}>
          <div className="rounded-full bg-main-green hover:bg-none p-1"><MdOutlinePeopleAlt className="size-5 "/></div>
            <h2>Personnel</h2>
          </div>
        </Link>
      </div>
      <div className="">
        <div className="p-2 hover:bg-main-green rounded-sm hover:text-white flex items-center space-x-2">
        <div className="rounded-full bg-main-green hover:bg-none p-1"><RiLogoutBoxRLine className="size-5" /></div>
          <h2>Logout</h2>
        </div>
      </div>
    </div>
  );
}
