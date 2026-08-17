import React, { useEffect, useState } from "react";
import axios from "axios";
import OwnerNavbar from "../components/OwnerNavbar";
import OwnerFooter from "../components/OwnerFooter";

const Team = () => {
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTeamMembers = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND}/owner/team`,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setWorkspaces(response.data.members);
            }
        } catch (error) {
            console.log(error);
            setError("Failed to fetch team members");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    // Total members across all workspaces
    const totalMembers = workspaces.reduce(
        (total, workspace) => total + workspace.members.length,
        0
    );

    if (loading) {
        return (
            <>
                <OwnerNavbar />

                <div className="min-h-screen bg-slate-50 pt-24 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-8 w-48 bg-slate-200 rounded-lg mb-3"></div>
                            <div className="h-4 w-80 bg-slate-200 rounded-lg mb-10"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div
                                        key={item}
                                        className="bg-white rounded-2xl p-6 border border-slate-200"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-slate-200"></div>

                                            <div className="flex-1">
                                                <div className="h-4 w-28 bg-slate-200 rounded mb-2"></div>
                                                <div className="h-3 w-36 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>

                                        <div className="mt-6 h-10 bg-slate-100 rounded-xl"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <OwnerFooter />
            </>
        );
    }

    if (error) {
        return (
            <>
                <OwnerNavbar />

                <div className="min-h-screen bg-slate-50 pt-24 px-4 flex justify-center">
                    <div className="w-full max-w-md mt-16">
                        <div className="bg-white border border-red-100 rounded-2xl p-8 text-center shadow-sm">
                            <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
                                <svg
                                    className="w-7 h-7 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-lg font-semibold text-slate-800">
                                Something went wrong
                            </h2>

                            <p className="text-sm text-slate-500 mt-2">
                                {error}
                            </p>

                            <button
                                onClick={() => {
                                    setLoading(true);
                                    setError("");
                                    fetchTeamMembers();
                                }}
                                className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>

                <OwnerFooter />
            </>
        );
    }

    return (
        <>
            <OwnerNavbar />

            <main className="min-h-screen bg-slate-50 pt-11 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                                <span className="text-sm font-medium text-indigo-600">
                                    Team Management
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                                Your Team
                            </h1>

                            <p className="text-slate-500 mt-2 max-w-xl">
                                Manage and view all members across your workspaces.
                            </p>
                        </div>

                        
                        <div className="flex gap-3">
                            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                                    Workspaces
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-0.5">
                                    {workspaces.length}
                                </p>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                                    Members
                                </p>
                                <p className="text-2xl font-bold text-indigo-600 mt-0.5">
                                    {totalMembers}
                                </p>
                            </div>
                        </div>
                    </div>

                      
                    {workspaces.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-3xl py-20 px-6 text-center shadow-sm">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center">
                                <svg
                                    className="w-10 h-10 text-indigo-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.7"
                                        d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 1a3 3 0 100-6 3 3 0 000 6zM12 14a4 4 0 00-4 4v2h8v-2a4 4 0 00-4-4z"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-xl font-semibold text-slate-800 mt-5">
                                No team members yet
                            </h2>

                            <p className="text-slate-500 text-sm mt-2">
                                Your workspace members will appear here.
                            </p>
                        </div>
                    ) : (
                        /* Workspace Sections */
                        <div className="space-y-8">
                            {workspaces.map((workspace) => (
                                <section
                                    key={workspace._id}
                                    className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm"
                                >
                                  
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                                {workspace.title
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}
                                            </div>

                                            <div>
                                                <h2 className="text-lg font-bold text-slate-800">
                                                    {workspace.title}
                                                </h2>

                                                <p className="text-sm text-slate-500 mt-0.5">
                                                    {workspace.members.length}{" "}
                                                    {workspace.members.length === 1
                                                        ? "member"
                                                        : "members"}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={`inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${workspace.status === "Active"
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${workspace.status === "Active"
                                                        ? "bg-emerald-500"
                                                        : "bg-slate-400"
                                                    }`}
                                            ></span>

                                            {workspace.status || "Active"}
                                        </span>
                                    </div>

                                    
                                    {workspace.members.length === 0 ? (
                                        <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center">
                                            <p className="text-sm text-slate-400">
                                                No members in this workspace
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                            {workspace.members.map((member) => (
                                                <div
                                                    key={member._id}
                                                    className="group border border-slate-200 rounded-2xl p-4 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        
                                                        <div className="relative shrink-0">
                                                            <img
                                                                src={
                                                                    member.photo ||
                                                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                                        member.name ||
                                                                        "Member"
                                                                    )}&background=EEF2FF&color=4F46E5&bold=true`
                                                                }
                                                                alt={
                                                                    member.fullname ||
                                                                    "Member"
                                                                }
                                                                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                                                            />

                                                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                                                        </div>

                                                       
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="font-semibold text-slate-800 truncate">
                                                                {member.fullname ||
                                                                    "Unnamed Member"}
                                                            </h3>

                                                            <p className="text-sm text-slate-500 truncate mt-0.5">
                                                                {member.email ||
                                                                    "No email available"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    
                                                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                                                <svg
                                                                    className="w-3.5 h-3.5 text-indigo-500"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7M12 11v10"
                                                                    />
                                                                </svg>
                                                            </div>

                                                            <span className="text-xs text-slate-500 truncate">
                                                                {workspace.title}
                                                            </span>
                                                        </div>

                                                        <span className="text-xs text-emerald-500 font-medium">
                                                            Active
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <OwnerFooter />
        </>
    );
};

export default Team;