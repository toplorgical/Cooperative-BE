import React from "react";
import AdminDashboard from "./components/dasboard";
import AdminLayout from "./components/admin-layout";
import PrivateRoute from "@/components/private-route";

const AdminModule = () => {
  return (
    <PrivateRoute>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </PrivateRoute>
  );
};

export default AdminModule;
