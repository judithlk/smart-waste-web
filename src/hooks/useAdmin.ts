export function useAdmin() {
  if (typeof window !== "undefined") {
    const admin = localStorage.getItem("admin");
    return admin ? JSON.parse(admin) : null;
  }
  return null;
}