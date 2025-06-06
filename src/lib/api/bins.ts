import api from "./api";
import { BinType } from "@/types/bin"; // You can define types for strict TS support

// 1. Get all bins
export const getAllBins = async (): Promise<BinType[]> => {
  const res = await api.get("/bins");
  return res.data;
};

// 2. Get bin by ID
export const getBinById = async (id: string): Promise<BinType> => {
  const res = await api.get(`/bins/${id}`);
  return res.data;
};

// 3. Add new bin
export const createBin = async (data: Omit<BinType, "_id">): Promise<any> => {
  const res = await api.post("/bins", data);
  return res.data;
};

// 4. Edit bin
export const editBin = async (
  id: string,
  data: Partial<BinType>
): Promise<any> => {
  const res = await api.put(`/bins/${id}`, data);
  return res.data;
};

// 5. Delete bin
export const deleteBin = async (id: string): Promise<any> => {
  const res = await api.delete(`/bins/${id}`);
  return res.data;
};

// 6. Update bin status
export const updateBinStatus = async (
  id: string,
  status: string
): Promise<any> => {
  const res = await api.patch(`/bins/${id}/status`, { status });
  return res.data;
};
