import api from "./api";
import { PersonnelType } from "@/types/personnel";

// 1. Get all personnel
export const getAllPersonnel = async (): Promise<PersonnelType[]> => {
  const res = await api.get("/personnel");
  return res.data;
};

// 2. Get personnel by ID
export const getPersonnelById = async (id: string): Promise<PersonnelType> => {
  const res = await api.get(`/personnel/${id}`);
  return res.data;
};

export const getPersonnelByPersonnelId = async (personnelId: string): Promise<PersonnelType> => {
  const res = await api.get(`/personnel/by-personnel-id/${personnelId}`);
  return res.data;
};

// 3. Add new personnel
export const createPersonnel = async (
  data: Omit<PersonnelType, "_id">
): Promise<PersonnelType> => {
  const res = await api.post("/personnel", data);
  return res.data;
};

// 4. Edit personnel
export const editPersonnel = async (
  id: string,
  data: Partial<PersonnelType>
): Promise<PersonnelType> => {
  const res = await api.put(`/personnel/${id}`, data);
  return res.data;
};

// 5. Delete personnel
export const deletePersonnel = async (id: string): Promise<any> => {
  const res = await api.delete(`/personnel/${id}`);
  return res.data;
};
