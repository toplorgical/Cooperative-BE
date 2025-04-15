"use client";

import React from "react";
import PrivateRoute from "@/components/private-route";
import AdminLayout from "../components/admin-layout";
import Users from "./users";

const UsersModule = () => {
  return (
    <PrivateRoute>
      <AdminLayout>
        <Users />
      </AdminLayout>
    </PrivateRoute>
  );
};

export default UsersModule;
