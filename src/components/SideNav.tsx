"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LuLayoutDashboard } from "react-icons/lu";
import { RiDeleteBin5Fill, RiLogoutBoxRLine } from "react-icons/ri";
import { BsCalendar2DateFill, BsPeopleFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-[20%] h-screen p-3 flex flex-col justify-between border-r border-gray-200">
      <div className="space-y-1">
        <div className="py-3 px-3">
          <h2 className="text-[2rem]">Smart Wasters</h2>
        </div>
        <Link href="/dashboard/" className="block">
          <div
            className={`p-2 ${
              pathname === "/dashboard" ? "bg-white" : ""
            } hover:bg-main-green font-semibold rounded-sm hover:text-white flex items-center space-x-2`}
          >
            <div className="rounded-full bg-white p-1">
              <LuLayoutDashboard className="size-5 fill-main-green text-main-green" />
            </div>
            <h2>Dashboard</h2>
          </div>
        </Link>
        <Link href="/dashboard/bin-management" className="block">
          <div
            className={`p-2 ${
              pathname === "/dashboard/bin-management" ? "bg-white" : ""
            } hover:bg-main-green font-semibold rounded-sm hover:text-white flex items-center space-x-2`}
          >
            <div className="rounded-full bg-white p-1">
              <RiDeleteBin5Fill className="size-5 fill-main-green text-white" />
            </div>
            <h2>Bin Management</h2>
          </div>
        </Link>
        <Link href="/dashboard/schedule-management" className="block">
          <div
            className={`p-2 ${
              pathname === "/dashboard/schedule-management" ? "bg-white" : ""
            } hover:bg-main-green font-semibold rounded-sm hover:text-white flex items-center space-x-2`}
          >
            <div className="rounded-full bg-white p-1">
              <BsCalendar2DateFill className="size-5 fill-main-green text-white" />
            </div>
            <h2>Schedules</h2>
          </div>
        </Link>
        <Link href="/dashboard/personnel-management" className="block">
          <div
            className={`p-2 ${
              pathname === "/dashboard/personnel-management" ? "bg-white" : ""
            } hover:bg-main-green font-semibold rounded-sm hover:text-white flex items-center space-x-2`}
          >
            <div className="rounded-full bg-white p-1">
              <BsPeopleFill className="size-5 fill-main-green text-white" />
            </div>
            <h2>Personnel</h2>
          </div>
        </Link>
        <Link href="/dashboard/schedule-history" className="block">
          <div
            className={`p-2 ${
              pathname === "/dashboard/schedule-history" ? "bg-white" : ""
            } hover:bg-main-green font-semibold rounded-sm hover:text-white flex items-center space-x-2`}
          >
            <div className="rounded-full bg-white p-1">
              <FaHistory className="size-5 fill-main-green text-white" />
            </div>
            <h2>History and Reports</h2>
          </div>
        </Link>
        <Link href="/dashboard/manage-system" className="block">
          <div
            className={`p-2 ${
              pathname === "/dashboard/manage-system" ? "bg-white" : ""
            } hover:bg-main-green font-semibold rounded-sm hover:text-white flex items-center space-x-2`}
          >
            <div className="rounded-full bg-white p-1">
              <IoMdSettings className="size-5 fill-main-green text-white" />
            </div>
            <h2>Manage System</h2>
          </div>
        </Link>
      </div>
      <div className="">
        <div className="p-2 hover:bg-main-green rounded-sm hover:text-white flex items-center space-x-2">
          <div className="rounded-full bg-main-green hover:bg-none p-1">
            <RiLogoutBoxRLine className="size-5" />
          </div>
          <h2>Logout</h2>
        </div>
      </div>
    </div>
  );
}
