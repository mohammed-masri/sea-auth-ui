"use client";
import { useAppSelector } from "@/store/hooks";

import { selectAccessToken } from "@/store/slices/auth/slice";
import React, { useEffect } from "react";

import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { useRouter } from "next/navigation";

export default function RedirectToApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const accessToken = useAppSelector(selectAccessToken);
  const params = useGetQueryParam();
  const redirectURL = params("redirectURL");

  useEffect(() => {
    if (redirectURL) {
      router.replace(`${redirectURL}?token=${accessToken}`);
    }
  }, [accessToken, redirectURL, router]);

  return <>{children}</>;
}
