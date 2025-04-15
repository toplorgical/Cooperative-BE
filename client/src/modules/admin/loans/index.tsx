"use client";

import React from "react";
import Loans from "./loans";
import PrivateRoute from "@/components/private-route";
import AdminLayout from "../components/admin-layout";

const LoansModule = () => {
  return (
    <PrivateRoute>
      <AdminLayout>
        <Loans />
      </AdminLayout>
    </PrivateRoute>
  );
};

export default LoansModule;
