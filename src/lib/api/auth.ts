import api from "./api";

export const adminLogin = async (username: string, password: string) => {
     try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Login failed. Please try again.";
    throw new Error(message);
  }
}

