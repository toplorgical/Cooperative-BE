"use client";

import React from "react";
import Transactions from "./transactions";
import PrivateRoute from "@/components/private-route";
import AdminLayout from "../components/admin-layout";

const TransactionModule = () => {
  return (
    <PrivateRoute>
      <AdminLayout>
        <Transactions />
      </AdminLayout>
    </PrivateRoute>
  );
};

export default TransactionModule;
