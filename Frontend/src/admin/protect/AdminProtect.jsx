import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtect = ({ children }) => {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const admin = localStorage.getItem("one5workspaceadmin");

        if (!admin) {
            navigate("/admin-login", { replace: true });
            return;
        }

        setChecking(false);
    }, [navigate]);

    if (checking) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
            </div>
        );
    }

    return children;
};

export default AdminProtect;