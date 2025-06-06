"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Loading from "../Loading";

type Props = {
  children: React.ReactNode;
};

const DashboardProtection = ({ children }: Props) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return <Loading />;

  return <>{children}</>;
};

export default DashboardProtection;
