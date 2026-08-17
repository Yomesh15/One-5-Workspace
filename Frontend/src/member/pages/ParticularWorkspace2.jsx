import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    Mail,
    User,
    Users,
} from "lucide-react";
import { motion } from "framer-motion";
import MemberNavbar from "../components/MemberNavbar";
import MemberFooter from "../components/MemberFooter";

const ParticularWorkspace2 = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [workspace, setWorkspace] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWorkspace = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND}/member/particularworkspace/${id}`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setWorkspace(res.data.workspace);
            } else {
                toast.error(
                    res.data.message || "Unable to fetch workspace"
                );
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to fetch workspace"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkspace();
    }, [id]);

    // Loading UI
    if (loading) {
        return (
            <>
                <MemberNavbar />

                <div className="min-h-screen bg-[#fafafa] px-5 py-8 sm:px-8 lg:px-10">
                    <div className="mx-auto max-w-6xl animate-pulse">
                        <div className="h-5 w-40 rounded bg-black/10" />

                        <div className="mt-7 overflow-hidden rounded-[28px] border border-black/10 bg-white">
                            <div className="h-64 bg-black/5 sm:h-80" />

                            <div className="grid sm:grid-cols-3">
                                <div className="h-24 border-b bg-black/[0.02] sm:border-b-0 sm:border-r" />
                                <div className="h-24 border-b bg-black/[0.02] sm:border-b-0 sm:border-r" />
                                <div className="h-24 bg-black/[0.02]" />
                            </div>
                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
                            <div className="h-72 rounded-[24px] bg-black/5" />
                            <div className="h-72 rounded-[24px] bg-black/5" />
                        </div>
                    </div>
                </div>

                <MemberFooter />
            </>
        );
    }

    // Workspace not found
    if (!workspace) {
        return (
            <>
                <MemberNavbar />

                <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-5">
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
                            <BriefcaseBusiness size={28} />
                        </div>

                        <h1 className="mt-5 text-2xl font-bold text-black">
                            Workspace not found
                        </h1>

                        <p className="mt-2 text-sm text-black/50">
                            This workspace may no longer exist or you may not
                            have access to it.
                        </p>

                        <button
                            onClick={() => navigate(-1)}
                            className="mt-6 flex mx-auto items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                        >
                            <ArrowLeft size={16} />
                            Go Back
                        </button>
                    </div>
                </div>

                <MemberFooter />
            </>
        );
    }

    const members = workspace.members || [];

    return (
        <>
            <MemberNavbar />

            <div className="min-h-screen bg-[#fafafa] text-black">
                <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">

                    {/* Back Button */}
                    <div className="mb-7">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-sm font-medium text-black/60 transition hover:text-black"
                        >
                            <ArrowLeft size={17} />
                            Back to Workspaces
                        </button>
                    </div>

                    {/* Workspace Header */}
                    <motion.section
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm"
                    >
                        {/* Workspace Image */}
                        <div className="relative h-56 overflow-hidden bg-black sm:h-72">
                            {workspace.photo ? (
                                <img
                                    src={workspace.photo}
                                    alt={workspace.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-black">
                                    <BriefcaseBusiness
                                        size={70}
                                        strokeWidth={1}
                                        className="text-white/60"
                                    />
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8">
                                <div className="mb-3">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-md ${workspace.status === "Closed"
                                                ? "bg-white/15 text-white"
                                                : "bg-emerald-500/20 text-white"
                                            }`}
                                    >
                                        <CheckCircle2 size={13} />

                                        {workspace.status || "Active"}
                                    </span>
                                </div>

                                <h1 className="truncate text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    {workspace.title}
                                </h1>
                            </div>
                        </div>

                        {/* Workspace Stats */}
                        <div className="grid border-t border-black/10 sm:grid-cols-3">

                            {/* Members */}
                            <div className="border-b border-black/10 p-6 sm:border-b-0 sm:border-r">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                                        <Users size={20} />
                                    </div>

                                    <div>
                                        <p className="text-2xl font-bold">
                                            {members.length}
                                        </p>

                                        <p className="text-xs text-black/50">
                                            Total Members
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Created Date */}
                            <div className="border-b border-black/10 p-6 sm:border-b-0 sm:border-r">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-black/[0.03]">
                                        <CalendarDays size={20} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {workspace.createdAt
                                                ? new Date(
                                                    workspace.createdAt
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )
                                                : "N/A"}
                                        </p>

                                        <p className="text-xs text-black/50">
                                            Created On
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Owner */}
                            <div className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                                        <User size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {workspace.owner?.fullname ||
                                                "Owner"}
                                        </p>

                                        <p className="text-xs text-black/50">
                                            Workspace Owner
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Content */}
                    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">

                        {/* LEFT */}
                        <div className="space-y-6">

                            {/* About Workspace */}
                            <motion.section
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="rounded-[24px] border border-black/10 bg-white p-6 shadow-sm sm:p-7"
                            >
                                <div className="mb-5">
                                    <h2 className="text-lg font-bold">
                                        About Workspace
                                    </h2>

                                    <p className="mt-1 text-sm text-black/45">
                                        Workspace information
                                    </p>
                                </div>

                                <p className="text-sm leading-7 text-black/65">
                                    {workspace.description ||
                                        "No description available."}
                                </p>
                            </motion.section>

                            {/* Members */}
                            <motion.section
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="rounded-[24px] border border-black/10 bg-white shadow-sm"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-black/10 p-6 sm:p-7">
                                    <div>
                                        <h2 className="text-lg font-bold">
                                            Workspace Members
                                        </h2>

                                        <p className="mt-1 text-sm text-black/45">
                                            People working in this workspace
                                        </p>
                                    </div>

                                    <div className="flex h-10 min-w-10 items-center justify-center rounded-full bg-black px-3 text-sm font-bold text-white">
                                        {members.length}
                                    </div>
                                </div>

                                {/* Member List */}
                                <div className="p-4 sm:p-6">
                                    {members.length === 0 ? (
                                        <div className="rounded-2xl border border-dashed border-black/15 px-5 py-12 text-center">
                                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5">
                                                <Users size={25} />
                                            </div>

                                            <h3 className="mt-4 font-semibold">
                                                No members
                                            </h3>

                                            <p className="mt-1 text-sm text-black/45">
                                                There are currently no members
                                                in this workspace.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {members.map(
                                                (member, index) => (
                                                    <motion.div
                                                        key={member._id}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                index * 0.04,
                                                        }}
                                                        className="flex items-center rounded-2xl border border-black/5 p-3 transition hover:border-black/15 hover:bg-black/[0.02]"
                                                    >
                                                        <div className="flex min-w-0 items-center gap-3">

                                                            {/* Member Photo */}
                                                            {member.photo ? (
                                                                <img
                                                                    src={
                                                                        member.photo
                                                                    }
                                                                    alt={
                                                                        member.fullname
                                                                    }
                                                                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                                                                    <User
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </div>
                                                            )}

                                                            {/* Member Details */}
                                                            <div className="min-w-0">
                                                                <p className="truncate text-sm font-semibold">
                                                                    {member.fullname ||
                                                                        "Unnamed Member"}
                                                                </p>

                                                                <p className="flex items-center gap-1 truncate text-xs text-black/45">
                                                                    <Mail
                                                                        size={
                                                                            12
                                                                        }
                                                                    />

                                                                    {member.email ||
                                                                        "No email available"}
                                                                </p>

                                                                <p className="mt-0.5 truncate font-mono text-[10px] text-black/30">
                                                                    ID:{" "}
                                                                    {member._id}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.section>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="space-y-6">

                            {/* Workspace Owner */}
                            <motion.section
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-[24px] border border-black/10 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                                        <User size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold">
                                            Workspace Owner
                                        </h2>

                                        <p className="text-xs text-black/45">
                                            Owner information
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl border border-black/5 bg-black/[0.02] p-4">
                                    <div className="flex items-center gap-3">

                                        {/* Owner Photo */}
                                        {workspace.owner?.photo ? (
                                            <img
                                                src={
                                                    workspace.owner.photo
                                                }
                                                alt={
                                                    workspace.owner.fullname
                                                }
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                                                <User size={19} />
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold">
                                                {workspace.owner?.fullname ||
                                                    "Owner"}
                                            </p>

                                            <p className="mt-1 truncate text-xs text-black/45">
                                                {workspace.owner?.email ||
                                                    "No email available"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2">
                                        <CheckCircle2
                                            size={15}
                                            className="text-emerald-600"
                                        />

                                        <span className="text-xs font-medium text-emerald-600">
                                            Workspace Owner
                                        </span>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Workspace Status */}
                            <motion.section
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="rounded-[24px] border border-black/10 bg-white p-6 shadow-sm"
                            >
                                <h2 className="text-lg font-bold">
                                    Workspace Status
                                </h2>

                                <div className="mt-5 rounded-2xl border border-black/5 bg-black/[0.02] p-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-black/50">
                                            Current Status
                                        </span>

                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${workspace.status === "Closed"
                                                    ? "bg-slate-100 text-slate-500"
                                                    : "bg-emerald-50 text-emerald-600"
                                                }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${workspace.status === "Closed"
                                                        ? "bg-slate-400"
                                                        : "bg-emerald-500"
                                                    }`}
                                            />

                                            {workspace.status || "Active"}
                                        </span>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Read Only Notice */}
                            <motion.section
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="rounded-[24px] border border-black/10 bg-black p-6 text-white shadow-sm"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                                    <BriefcaseBusiness size={19} />
                                </div>

                                <h2 className="mt-4 text-base font-bold">
                                    Workspace Access
                                </h2>

                                <p className="mt-2 text-xs leading-5 text-white/55">
                                    You are viewing this workspace as a
                                    member. Workspace settings and member
                                    management are available only to the
                                    workspace owner.
                                </p>
                            </motion.section>
                        </div>
                    </div>
                </main>
            </div>

            <MemberFooter />
        </>
    );
};

export default ParticularWorkspace2;