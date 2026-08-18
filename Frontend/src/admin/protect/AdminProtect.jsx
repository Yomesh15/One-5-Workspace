import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtect = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("one5workspaceadmin");

        if (!admin) {
            navigate("/admin-login", { replace: true });
        }
    }, [navigate]);

    return children;
};

export default AdminProtect;