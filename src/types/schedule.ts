// types/schedule.ts
export type ScheduleType = {
  _id: string;
  scheduleNo: string;
  bins: {
    binId: string;
    location: {
      lat: number;
      lon: number;
      address: string;
    };
  }[];
  personnelId: string;
  scheduledDate: any;
  createdBy: string;
  status: "pending" | "completed" | "cancelled";
  route?: any; // can be refined later
  createdAt: any;
};
