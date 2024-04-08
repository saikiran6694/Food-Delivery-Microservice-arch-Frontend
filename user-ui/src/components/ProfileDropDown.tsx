"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import AuthScreen from "../screens/AuthScreen";
import useUser from "../hooks/useUser";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useSession, signOut } from "next-auth/react";

const ProfileDropDown = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, loading } = useUser();

  const { data } = useSession();

  useEffect(() => {
    if (!loading) {
      setSignedIn(!!user);
    }

    if (data?.user) {
      setSignedIn(true);
    }
  }, [loading, user, open, data]);

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    toast.success("Logout Successfull");
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-4">
      {signedIn ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              src={data?.user ? data.user.image : user?.avatar?.url}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">
                Signed in as <br />
                <span className="font-semibold">
                  {data?.user ? data?.user.email : user.email}
                </span>
              </p>
            </DropdownItem>
            <DropdownItem key="settings">Profile</DropdownItem>
            <DropdownItem key="all_orders">All orders</DropdownItem>
            <DropdownItem key="team_settings">
              Apply for a seller account
            </DropdownItem>
            <DropdownItem onClick={handleLogout} key="logout" color="danger">
              Log out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <CgProfile
          className="text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      )}
      {open && <AuthScreen setSignedIn={setSignedIn} setOpen={setOpen} />}
    </div>
  );
};

export default ProfileDropDown;
