"use client";

import { useEffect, useState } from "react";

import { MdOutlineDoneAll } from "react-icons/md";
import { BiBroadcast } from "react-icons/bi";
import { FaExclamation } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

import { ClipLoader } from "react-spinners";

import { fetchDashboardSummary } from "@/lib/api/dashboard";

export default function InfoBar() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchSummary = async () => {
        try {
          const data = await fetchDashboardSummary();
          setSummary(data);
        } finally {
          setLoading(false);
        }
      };
      fetchSummary();
    }, []);

    // console.log(summary);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-5 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-500">Active Bins</h2>
          <BiBroadcast className="size-6 text-[#4CBB17]" />
        </div>
        <h3 className="text-3xl text-right mt-2 font-bold">{loading ? <ClipLoader size={25} color="#96D127" /> : summary.totalBins}</h3>
      </div>
      <div className="p-5 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-500">Pending Disposals</h2>
          <FaExclamation className="size-5 text-[#FF0000]" />
        </div>
        <h3 className="text-3xl text-right mt-2 font-bold">{loading ? <ClipLoader size={25} color="#96D127" /> : summary.totalPendingDisposals}</h3>
      </div>
      <div className="p-5 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-500">Personnel Count</h2>
          <FaPerson className="size-6 text-[#00B9E8]" />
        </div>
        <h3 className="text-3xl text-right mt-2 font-bold">{loading ? <ClipLoader size={25} color="#96D127" /> : summary.registeredPersonnel}</h3>
      </div>
      <div className="p-5 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-500">Completed Trips</h2>
          <MdOutlineDoneAll className="size-6 text-main-green" />
        </div>
        <h3 className="text-3xl text-right mt-2 font-bold">{loading ? <ClipLoader size={25} color="#96D127" /> : summary.tripsCompleted}</h3>
      </div>
    </div>
  );
}
