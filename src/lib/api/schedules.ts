import api from "./api";
import { ScheduleType } from "@/types/schedule";

// 1. Create new optimized schedule
export const createSchedule = async (data: {
  binIds: string[];
  personnelId: string;
  scheduledDate: string;
  createdBy: string;
}) => {
  const res = await api.post("/schedules", data);
  return res.data.schedule;
};

// 2. Get all schedules (admin view)
export const getAllSchedules = async (): Promise<ScheduleType[]> => {
  const res = await api.get("/schedules");
  return res.data;
};

// 3. Get schedules by personnel ID
export const getSchedulesByPersonnelId = async (
  personnelId: string
): Promise<ScheduleType[]> => {
  const res = await api.get(`/schedules/personnel/${personnelId}`);
  return res.data;
};

// 4. Update a schedule
export const updateSchedule = async (
  id: string,
  data: Partial<ScheduleType>
): Promise<ScheduleType> => {
  const res = await api.put(`/schedules/${id}`, data);
  return res.data.schedule;
};

// 5. Delete a schedule
export const deleteSchedule = async (id: string): Promise<void> => {
  await api.delete(`/schedules/${id}`);
};

// 6. Update only status (completed/cancelled)
export const updateScheduleStatus = async (
  id: string,
  status: "completed" | "cancelled"
): Promise<ScheduleType> => {
  const res = await api.patch(`/schedules/status/${id}`, { status });
  return res.data.schedule;
};

export const getScheduleById = async (id: string): Promise<ScheduleType> => {
  const res = await api.get(`/schedules/${id}`);
  return res.data;
};
