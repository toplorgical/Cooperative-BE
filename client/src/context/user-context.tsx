"use client";

import pathnames from "@/constants/pathnames";
import CookieManager from "@/manager/cookieManager";
import UserRepository from "@/repository/userRepository";
import ErrorService from "@/services/errorService";
import { UserProps } from "@/types";
import { redirect, usePathname } from "next/navigation";
import React from "react";

interface UserContextProps {
  user: UserProps | null;
  refetch: () => Promise<void>;
  isLoading: boolean;
  currentPath: string;
  signout(): void;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
}

const UserContext = React.createContext({} as UserContextProps);
const accessToken = CookieManager.get("_tp_access_token");

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const currentPath = pathname?.split("/")[1];

  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<UserProps | null>(null);

  React.useEffect(() => {
    if (!accessToken && ["user", "admin", "verification"].includes(currentPath)) {
      window.location.replace(pathnames.SIGN_IN);
      return;
    }
    getAuthenticatedUser();
    //eslint-disable-next-line
  }, [accessToken]);

  async function getAuthenticatedUser() {
    try {
      if (!accessToken) return;
      if (!["user", "admin", "verification"].includes(currentPath)) return;
      const { data } = await UserRepository.getAuthenticatedUser();
      setUser(data?.data);
      setIsLoading(false);
      handleRedirect(data?.data as UserProps);
    } catch (error) {
      setIsLoading(false);
      ErrorService.handler(error);
    }
  }

  function handleRedirect(user: UserProps) {
    const _paths = [pathnames.SETUP_PERSONAL_INFO, pathnames.SETUP_WORK_INFO];
    if (user?.profileSetup !== "COMPLETED" && !_paths.includes(pathname)) {
      if (user?.profileSetup === "PERSONAL_INFO") {
        window.location.replace(pathnames.SETUP_PERSONAL_INFO);
      }
      if (user?.profileSetup === "WORK_INFO") {
        window.location.replace(pathnames.SETUP_WORK_INFO);
      }
    }
  }

  function signout() {
    CookieManager.remove("_tp_access_token");
    window.location.replace(pathnames.SIGN_IN);
  }

  const refetch = getAuthenticatedUser;

  return (
    <UserContext.Provider value={{ user, isLoading, setUser, refetch, currentPath, signout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
