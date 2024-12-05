"use client";
import React from "react";
import { Menu, MenuItem, Icon } from "sea-react-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setAuthData } from "@/store/slices/auth/slice";
import { pushNewAlert } from "@/store/slices/alert/slice";

export default function ProfileMenu() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    router.push("/login");
    dispatch(setAuthData(undefined));
    dispatch(
      pushNewAlert({
        message: "Logout successfully",
        theme: "light",
        type: "success",
      })
    );
  };

  return (
    <Menu
      menuButton={
        <Icon icon="material-symbols:settings" className="text-white w-5 h-5" />
      }
    >
      <div className="flex flex-col gap-2 p-2">
        <MenuItem key="profile-menu">
          <Link href="/profile" className="flex items-center gap-2 px-4 py-2">
            <Icon
              icon="iconamoon:profile-fill"
              className="text-gray-500 w-5 h-5"
            />
            <p>Profile</p>
          </Link>
        </MenuItem>
        <MenuItem key="settings-menu">
          <Link href="/settings" className="flex items-center gap-2 px-4 py-2">
            <Icon
              icon="material-symbols:settings"
              className="text-gray-500 w-5 h-5"
            />
            <p>Settings</p>
          </Link>
        </MenuItem>

        <MenuItem key="logout">
          <button
            className="flex items-center gap-2 px-4 py-2"
            onClick={() => handleLogout()}
          >
            <Icon
              icon="material-symbols:logout"
              className="text-gray-500 w-5 h-5"
            />
            <p>Logout</p>
          </button>
        </MenuItem>
      </div>
    </Menu>
  );
}
