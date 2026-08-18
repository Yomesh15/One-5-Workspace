import React, { useEffect, useState } from "react";
import { ShieldCheck, UserCircle } from "lucide-react";
import axios from "axios";

const AdminNavbar = () => {

    const [admin, setAdmin] = useState(null);

    const FetchCurrentAdmin = async () => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND}/admin/currentadmin`,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setAdmin(response.data.admin);
            }

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        FetchCurrentAdmin();
    }, []);


    return (
        <nav className="w-full border-b border-gray-200 bg-white">

            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">

                {/* Logo */}
                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                        <ShieldCheck
                            size={21}
                            strokeWidth={1.8}
                        />
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-black">
                            One 5
                        </h1>

                        <p className="-mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
                            Workspace Admin
                        </p>
                    </div>

                </div>


                {/* Admin Profile */}
                <div className="flex items-center gap-3">

                    <div className="mx-1 hidden h-7 w-px bg-gray-200 sm:block" />

                    <div className="flex items-center gap-3">

                        {/* Admin Information */}
                        <div className="hidden text-right sm:block">

                            <p className="text-sm font-medium text-gray-900">
                                {admin?.name || "One 5 Admin"}
                            </p>

                            <p className="text-xs text-gray-400">
                                Administrator
                            </p>

                        </div>


                        {/* Profile Photo */}
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">

                            {admin?.photo ? (
                                <img
                                    src={admin.photo}
                                    alt={admin.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-gray-500">
                                    <UserCircle
                                        size={23}
                                        strokeWidth={1.7}
                                    />
                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </nav>
    );
};

export default AdminNavbar;