import React, { useEffect, useState } from "react";
import axios from "axios";
import MemberNavbar from "../components/MemberNavbar";
import MemberFooter from "../components/MemberFooter";

const Profile = () => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND}/member/currentmember`,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setMember(response.data.member);
            } else {
                setError("Unable to fetch profile");
            }
        } catch (error) {
            console.log(error);
            setError("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Copy UID
    const copyUID = async () => {
        if (!member?._id) return;

        try {
            await navigator.clipboard.writeText(member._id);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.log("Failed to copy UID:", error);
        }
    };

    if (loading) {
        return (
            <>
                <MemberNavbar />

                <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                    <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl p-8 shadow-sm animate-pulse">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-28 h-28 rounded-3xl bg-slate-200"></div>

                            <div className="flex-1 text-center sm:text-left">
                                <div className="h-7 bg-slate-200 rounded-lg w-48 mx-auto sm:mx-0"></div>

                                <div className="h-4 bg-slate-200 rounded w-64 mt-3 mx-auto sm:mx-0"></div>

                                <div className="h-7 bg-slate-200 rounded-full w-20 mt-4 mx-auto sm:mx-0"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                            <div className="h-24 bg-slate-100 rounded-2xl"></div>
                            <div className="h-24 bg-slate-100 rounded-2xl"></div>
                            <div className="h-24 bg-slate-100 rounded-2xl"></div>
                            <div className="h-24 bg-slate-100 rounded-2xl"></div>
                        </div>
                    </div>
                </div>

                <MemberFooter />
            </>
        );
    }

    if (error) {
        return (
            <>
                <MemberNavbar />

                <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                    <div className="bg-white border border-red-100 rounded-3xl p-10 max-w-md w-full text-center shadow-sm">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-red-500"
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

                        <h2 className="text-xl font-bold text-slate-800 mt-5">
                            Unable to load profile
                        </h2>

                        <p className="text-sm text-slate-500 mt-2">
                            {error}
                        </p>

                        <button
                            onClick={() => {
                                setLoading(true);
                                setError("");
                                fetchProfile();
                            }}
                            className="mt-6 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                        >
                            Try Again
                        </button>
                    </div>
                </div>

                <MemberFooter />
            </>
        );
    }

    if (!member) {
        return (
            <>
                <MemberNavbar />

                <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                    <p className="text-slate-500">Profile not found.</p>
                </div>

                <MemberFooter />
            </>
        );
    }

    const workspace = member.workspace;

    return (
        <>
            <MemberNavbar />

            <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-5xl mx-auto">


                    <div className="mb-8">
                        <p className="text-sm font-semibold text-indigo-600">
                            ACCOUNT
                        </p>

                        <h1 className="text-3xl font-bold text-slate-900 mt-1">
                            My Profile
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Manage your personal information and workspace details.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">


                        <div className="p-6 sm:p-8 lg:p-10">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                                <div className="relative mx-auto sm:mx-0">
                                    <img
                                        src={
                                            member.photo ||
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                member.fullname || "Member"
                                            )}&background=EEF2FF&color=4F46E5&size=256&bold=true`
                                        }
                                        alt={member.fullname}
                                        className="w-28 h-28 rounded-3xl object-cover ring-4 ring-indigo-50 shadow-sm"
                                    />


                                    <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 border-4 border-white rounded-full"></span>
                                </div>


                                <div className="text-center sm:text-left flex-1">

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                            {member.fullname || "Unnamed Member"}
                                        </h2>

                                        <span className="w-fit mx-auto sm:mx-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                            Active
                                        </span>
                                    </div>

                                    <p className="text-slate-500 mt-2">
                                        {member.email || "No email available"}
                                    </p>

                                    <p className="text-sm text-slate-400 mt-2">
                                        Team Member
                                    </p>


                                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 mt-3">
                                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 max-w-full">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                                UID
                                            </span>

                                            <span className="text-sm font-mono text-slate-600 truncate max-w-[180px] sm:max-w-[300px]">
                                                {member._id}
                                            </span>
                                        </div>

                                        <button
                                            onClick={copyUID}
                                            type="button"
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${copied
                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                                }`}
                                        >
                                            {copied ? (
                                                <>

                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>

                                                    Copied!
                                                </>
                                            ) : (
                                                <>

                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <rect
                                                            x="9"
                                                            y="9"
                                                            width="11"
                                                            height="11"
                                                            rx="2"
                                                            ry="2"
                                                        ></rect>

                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                                                        />
                                                    </svg>

                                                    Copy UID
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="border-t border-slate-100"></div>


                        <div className="p-6 sm:p-8 lg:p-10">

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-indigo-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-800">
                                        Personal Information
                                    </h3>

                                    <p className="text-xs text-slate-400 mt-0.5">
                                        Your account details
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Full Name
                                    </p>

                                    <p className="text-sm font-semibold text-slate-800 mt-2">
                                        {member.fullname || "Not provided"}
                                    </p>
                                </div>


                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Email Address
                                    </p>

                                    <p className="text-sm font-semibold text-slate-800 mt-2 break-all">
                                        {member.email || "Not provided"}
                                    </p>
                                </div>


                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Phone
                                    </p>

                                    <p className="text-sm font-semibold text-slate-800 mt-2">
                                        {member.phone || "Not provided"}
                                    </p>
                                </div>


                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Role
                                    </p>

                                    <p className="text-sm font-semibold text-slate-800 mt-2">
                                        Team Member
                                    </p>
                                </div>
                            </div>
                        </div>


                        {workspace && (
                            <>
                                <div className="border-t border-slate-100"></div>

                                <div className="p-6 sm:p-8 lg:p-10">

                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-violet-600"
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

                                        <div>
                                            <h3 className="font-bold text-slate-800">
                                                My Workspace
                                            </h3>

                                            <p className="text-xs text-slate-400 mt-0.5">
                                                Workspace you belong to
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 border border-indigo-100 rounded-2xl p-5 sm:p-6">

                                        <div className="flex flex-col sm:flex-row sm:items-center gap-5">


                                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-indigo-100 shadow-sm shrink-0">
                                                <img
                                                    src={
                                                        workspace.photo ||
                                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            workspace.title || "Workspace"
                                                        )}&background=4F46E5&color=fff&bold=true`
                                                    }
                                                    alt={workspace.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>


                                            <div className="flex-1 min-w-0">

                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <h4 className="text-lg font-bold text-slate-800 truncate">
                                                        {workspace.title}
                                                    </h4>

                                                    <span
                                                        className={`w-fit inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${workspace.status === "Closed"
                                                            ? "bg-slate-100 text-slate-500"
                                                            : "bg-emerald-50 text-emerald-600"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${workspace.status === "Closed"
                                                                ? "bg-slate-400"
                                                                : "bg-emerald-500"
                                                                }`}
                                                        ></span>

                                                        {workspace.status || "Active"}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                                                    {workspace.description ||
                                                        "No workspace description available."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}


                        <div className="bg-slate-50 border-t border-slate-100 px-6 sm:px-8 lg:px-10 py-5">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <p className="text-xs text-slate-400">
                                    Profile information
                                </p>

                                <p className="text-xs text-slate-400">
                                    Your workspace account
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MemberFooter />
        </>
    );
};

export default Profile;