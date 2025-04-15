import AppLayout from "@/components/app-layout";
import PrivateRoute from "@/components/private-route";
import React, { Suspense } from "react";
import Settings from "./settings";

const SettingsModule = () => {
  return (
    <PrivateRoute>
      <AppLayout>
        <Suspense>
          <Settings />
        </Suspense>
      </AppLayout>
    </PrivateRoute>
  );
};

export default SettingsModule;
