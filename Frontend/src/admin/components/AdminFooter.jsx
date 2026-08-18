import React from "react";
import {
    ShieldCheck,
    LockKeyhole,
    CircleCheck,
} from "lucide-react";

const AdminFooter = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="flex flex-col gap-8 py-8 md:flex-row md:items-center md:justify-between">


                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white shadow-sm">
                            <ShieldCheck
                                size={20}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>
                            <p className="text-sm font-semibold tracking-tight text-gray-950">
                                One 5 Workspace
                            </p>

                            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
                                Administration
                            </p>
                        </div>

                    </div>


                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-gray-400">

                        <div className="flex items-center gap-2">
                            <LockKeyhole
                                size={14}
                                strokeWidth={1.7}
                            />
                            <span>
                                Secure Admin Access
                            </span>
                        </div>

                        <div className="hidden h-4 w-px bg-gray-200 sm:block" />

                        <div className="flex items-center gap-2">
                            <CircleCheck
                                size={14}
                                strokeWidth={1.7}
                            />
                            <span>
                                System Operational
                            </span>
                        </div>

                    </div>



                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">

                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>

                        <span className="text-xs font-medium text-gray-600">
                            All systems operational
                        </span>

                    </div>

                </div>



                <div className="flex flex-col gap-2 border-t border-gray-100 py-5 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">

                    <p>
                        © {new Date().getFullYear()} One 5 Workspace. All rights reserved.
                    </p>

                    <p className="text-gray-400">
                        Administrator Portal
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default AdminFooter;