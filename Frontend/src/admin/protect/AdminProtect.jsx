import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtect = () => {
    const admin = localStorage.getItem("one5workspaceadmin");

    if (!admin) {
        return <Navigate to="/member" replace />;
    }

    return <Outlet />;
};

export default AdminProtect;