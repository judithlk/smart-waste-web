import api from "./api";

export const fetchDashboardSummary = async () : Promise<any> => {
  const res = await api.get("/dashboard/summary");
  return res.data;
}
