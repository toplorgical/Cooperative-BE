"use client";
import React from "react";
import { UserContext } from "@/context/user-context";
import pathnames from "@/constants/pathnames";
import { useSearchParams } from "next/navigation";
import PersonalTab from "./tabs/personal";
import SecurityTab from "./tabs/password";
import WorkTab from "./tabs/work";
import PhoneTab from "./tabs/phone";
import Link from "next/link";
import { UserProps } from "@/types";

const tabs = [
  { label: "Personal Info", href: pathnames.USER_SETTINGS + "?q=personal", q: "personal" },
  { label: "Work Info", href: pathnames.USER_SETTINGS + "?q=work", q: "work" },
  { label: "Security", href: pathnames.USER_SETTINGS + "?q=password", q: "password" },
  { label: "Change Phone Number", href: pathnames.USER_SETTINGS + "?q=phone", q: "phone" },
];

const Settings = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") as "personal" | "work" | "password" | "phone";
  const { user } = React.useContext(UserContext);

  return (
    <div className=" container mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-medium mb-6">Settings</h2>
      <div className="flex space-x-4 border-b overflow-auto text-nowrap">
        {tabs.map((tab) => (
          <Link
            href={tab.href}
            key={tab.href}
            replace={true}
            className={`py-2 px-4  ${q === tab.q ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="mt-6 overflow-auto">
        {q === "personal" ? (
          <PersonalTab />
        ) : q === "password" ? (
          <SecurityTab />
        ) : q === "work" ? (
          <WorkTab />
        ) : (
          <PhoneTab user={user as UserProps} />
        )}
      </div>
    </div>
  );
};

export default Settings;
