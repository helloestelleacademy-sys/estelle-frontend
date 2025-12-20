"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loading from "./Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // redirect only after loading is done
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />; // or a spinner
  }

  if (!user) {
    return null; // redirect will happen
  }

  return <>{children}</>;
};
