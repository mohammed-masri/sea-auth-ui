"use client";
import { Constants } from "@/config";
import React from "react";

export default function Title() {
  const identifier =
    localStorage.getItem(Constants.LocalStorageKeys.ResetPasswordIdentifier) +
    "";

  return (
    <div className="text-text font-semibold">
      <p className="text-center">Please confirm the OTP that you received at</p>
      <p className="text-center font-bold">{identifier}</p>
    </div>
  );
}
