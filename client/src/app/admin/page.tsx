"use client";

import CookieManager from "@/manager/cookieManager";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const accessToken = CookieManager.get("_tp_access_token");
    if (accessToken) {
      window.location.replace("/admin/dashboard");
    } else {
      window.location.replace("/admin/signin");
    }
  }, []);

  return null;
};

export default Page;
