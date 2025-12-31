"use client";

import React, { useEffect } from "react";
import { logout, setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export const PersistLogin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const refreshUser = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://estelle-backend.onrender.com/api/v1";
        const res = await fetch(`${backendUrl}/auth/refresh-token`, {
          method: "GET",
          credentials: "include", // send refresh token cookie
        });

        const data = await res.json();
        if (res.ok) {
          dispatch(setUser({ message: data.message, accessToken: data.accessToken, user: data.user }));
        } else {
          dispatch(logout());
        }
      } catch {
        dispatch(logout());
      }
    };

    refreshUser();
  }, [dispatch]);



  return <>{children}</>;
};
