import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AdminProtect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("one5workspaceadmin");

        if (!admin) {
            navigate("/member-home");
        }
    }, [navigate]);

    return <Outlet />;
};

export default AdminProtect;