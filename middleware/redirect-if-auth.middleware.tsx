"use client";
import { useAppSelector } from "@/store/hooks";

import { selectAccessToken } from "@/store/slices/auth/slice";
import React, { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";

export default function RedirectIfAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = useAppSelector(selectAccessToken);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (accessToken) {
      const query = searchParams.toString();
      redirect(`/dashboard?${query}`);
    }
  }, [accessToken, searchParams]);

  return <>{children}</>;
}
