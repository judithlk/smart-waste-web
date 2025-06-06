"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { getScheduleById, deleteSchedule } from "@/lib/api/schedules";
import { getPersonnelByPersonnelId } from "@/lib/api/personnel";
import { ScheduleType } from "@/types/schedule";
import { PersonnelType } from "@/types/personnel";

import { IoIosArrowRoundBack } from "react-icons/io";

import Loading from "@/components/Loading";

// Dynamically import the map component to prevent SSR issues
const RouteMap = dynamic(() => import("@/components/map-stuff/RouteMap"), {
  ssr: false,
});

export default function ScheduleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  const [schedule, setSchedule] = useState<ScheduleType | null>(null);
  const [personnel, setPersonnel] = useState<PersonnelType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteSchedule(resolvedParams.id);
      toast.success("Schedule deleted successfully");
      router.push("/dashboard/schedule-management");
    } catch (error: any) {
      toast.error("Failed to delete schedule: " + error.message);
    }
  };

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const data = await getScheduleById(resolvedParams.id);
        setSchedule(data);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchedule();
  }, [resolvedParams.id]);

  useEffect(() => {
    const fetchPersonnel = async () => {
      if (schedule?.personnelId) {
        try {
          const data = await getPersonnelByPersonnelId(schedule.personnelId);
          setPersonnel(data);
        } catch (error) {
          console.error("Error fetching personnel:", error);
        }
      }
    };

    fetchPersonnel();
  }, [schedule?.personnelId]);

  if (loading) return <Loading />;
  if (!schedule) return <p>Schedule not found.</p>;

  return (
    <div className="p-6 space-y-6">
      <div
        className="w-[85px] flex items-center text-main-green underline font-semibold hover:text-gray-400 cursor-pointer"
        onClick={() => router.push("/dashboard/schedule-management")}
      >
        <IoIosArrowRoundBack className="size-6" />
        <h2>Go back</h2>
      </div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{schedule.scheduleNo}</h1>
        <Button
          className="bg-red-700"
          onClick={() =>
            toast.warning("Delete Schedule?", {
              description: "This action cannot be reversed",
              action: {
                label: "Delete",
                onClick: () => handleDelete(),
              },
            })
          }
        >
          Delete
        </Button>
      </div>
      <div>
        <div>
          <h2>
            <strong>Status:</strong> {schedule.status}
          </h2>
        </div>
        <div>
          <h2>
            <strong>Empty Date:</strong>{" "}
            {new Date(schedule.scheduledDate).toLocaleDateString()}
          </h2>
        </div>
        <div>
          <h2>
            <strong>Scheduled By:</strong> {schedule.createdBy}
          </h2>
        </div>
        <div>
          <h2>
            <strong>Assigned Personnel:</strong> {schedule.personnelId}(
            {personnel
              ? personnel.name + ", " + personnel.phone
              : "Personnel info unavailable"}
            )
          </h2>
        </div>
      </div>
      <div className="flex space-x-5">
        <div>
          <h2 className="font-semibold mt-4">Bins:</h2>
          <ul className="list-disc ml-6">
            {schedule.bins.map((bin, index) => (
              <li key={index}>
                {bin.binId} – Location:{" "}
                {bin.location.address ||
                  `${bin.location.lat}, ${bin.location.lon}`}
              </li>
            ))}
          </ul>
        </div>

        {schedule.route && schedule.bins.length > 0 && (
          <div className="mt-6 w-full">
            <h2 className="text-xl font-semibold mb-2">Route Map</h2>
            <RouteMap route={schedule.route} bins={schedule.bins} />
          </div>
        )}
      </div>
    </div>
  );
}
