"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { getBinById, deleteBin } from "@/lib/api/bins";
import { BinType } from "@/types/bin";
import BinMap from "@/components/map-stuff/BinMap";

import Loading from "@/components/Loading";

import { IoIosArrowRoundBack } from "react-icons/io";

export default function BinPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [bin, setBin] = useState(null as BinType | null);
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

const handleDelete = async () => {
  try {
    await deleteBin(resolvedParams.id);
    toast.success("Bin deleted successfully");
    router.push("/dashboard/bin-management");
  } catch (error: any) {
    toast.error("Failed to delete bin: " + error.message);
  }
}
  useEffect(() => {
    async function fetchBin() {
      try {
        const data = await getBinById(resolvedParams.id);
        setBin(data);
      } catch (err) {
        console.error("Failed to fetch bin:", err);
      }
    }
    fetchBin();
  }, [resolvedParams.id]);

  if (!bin) return <Loading />;

  return (
    <div className="p-6 space-y-4">
      <div
        className="w-[85px] flex items-center text-main-green underline font-semibold hover:text-gray-400 cursor-pointer"
        onClick={() => router.push("/dashboard/bin-management")}
      >
        <IoIosArrowRoundBack className="size-6" />
        <h2>Go back</h2>
      </div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Bin ID: {bin.binId}</h1>
        <Button
          className="bg-red-700"
          onClick={() =>
            toast.warning("Delete bin?", {
              description: "This will delete the bin permanently",
              action: {
                label: "Delete",
                onClick: () => handleDelete(),
              },
            })
          }
        >
          Delete Bin
        </Button>
      </div>
      <div>
        <h3>
          <strong>Status:</strong> {bin.status}
        </h3>
        <h3>
          <strong>Fill Level:</strong> {bin.fillLevel}
        </h3>
        <h3>
          <strong>Location:</strong> {bin.location?.address}
        </h3>
        <h3>
          <strong>Last Emptied:</strong>{" "}
          {bin.lastEmptiedAt
            ? new Date(bin.lastEmptiedAt).toLocaleString()
            : "Never"}
        </h3>
      </div>

      {bin.location && (
        <BinMap
          latitude={bin.location.lat}
          longitude={bin.location.lon}
          binId={bin.binId}
        />
      )}
    </div>
  );
}
