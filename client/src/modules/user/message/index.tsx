import AppLayout from "@/components/app-layout";
import PrivateRoute from "@/components/private-route";
import React, { Suspense } from "react";
import Messages from "./messages";

const MessagesModule = () => {
  return (
    <PrivateRoute>
      <AppLayout>
        <Suspense>
          <Messages />
        </Suspense>
      </AppLayout>
    </PrivateRoute>
  );
};

export default MessagesModule;
