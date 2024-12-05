"use client";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import AuthActionInstance from "@/store/slices/auth/actions";
import MSALInstance from "@/utils/azure-msal-browser";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "sea-react-components";

export default function LoginViaMicrosoft() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async () => {
    try {
      const request = { scopes: ["User.Read"] };
      await MSALInstance.initialize();
      const { idToken } = await MSALInstance.loginPopup(request);

      const response = await AuthActionInstance.microsoftLogin(idToken);

      AuthActionInstance.handleSuccessLogin(
        response,
        dispatch,
        router,
        localStorage
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        pushNewAlert({
          message: error.message,
          type: "error",
          theme: "default",
        })
      );
    }
  };

  return (
    <Button type="button" className="bg-transparent" onClick={() => login()}>
      <p className="text-primary-light hover:text-opacity-50">
        Login Via Microsoft
      </p>
    </Button>
  );
}
