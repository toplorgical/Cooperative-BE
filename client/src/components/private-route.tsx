"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { UserContext } from "@/context/user-context";
import pathnames from "@/constants/pathnames";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading, currentPath } = React.useContext(UserContext);

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center" style={{ minHeight: "100vh" }}>
        <div>
          <AiOutlineLoading className="h-12 w-12 animate-spin text-[#53A4F5]" />
        </div>
      </div>
    );
  if (!isLoading && !user) {
    if (currentPath === "admin") {
      return redirect(pathnames.ADMIN_SIGNIN);
    }
    return redirect(pathnames.SIGN_IN);
  }
  if (!isLoading && user && !user?.isVerified) {
    return redirect(pathnames.VERIFICATION);
  }
  if (user && currentPath === "admin" && user.role === "USER") {
    alert("Access denied. Admin privileges required.");
    router.back();
    return null;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
