"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import { selectAccessToken } from "@/store/slices/auth/slice";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

export default function MustAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    if (!accessToken) {
      dispatch(
        pushNewAlert({
          message: "Session Expired!",
          type: "error",
          theme: "light",
        })
      );

      redirect("/login");
    }
  }, [accessToken]);

  return <>{children}</>;
}
