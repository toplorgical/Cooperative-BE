"use client";

import AppLayout from "@/components/app-layout";
import PrivateRoute from "@/components/private-route";
import React, { Suspense } from "react";
import Loans from "./components/loans";

const LoansModule = () => {
  return (
    <PrivateRoute>
      <AppLayout>
        <Suspense>
          <Loans />
        </Suspense>
      </AppLayout>
    </PrivateRoute>
  );
};

export default LoansModule;
