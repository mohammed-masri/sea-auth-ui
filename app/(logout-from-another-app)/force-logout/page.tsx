"use client";
import { Constants } from "@/config";
import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { useAppDispatch } from "@/store/hooks";
import { setAuthData } from "@/store/slices/auth/slice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ForceLogoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useGetQueryParam();

  useEffect(() => {
    localStorage.removeItem(Constants.LocalStorageKeys.JWTToken);
    dispatch(setAuthData(undefined));
    router.replace("/login");
  }, [dispatch, params, router]);
  return <div>Logging out...</div>;
}
