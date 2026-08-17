import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    BriefcaseBusiness,
    CalendarDays,
    Users,
    User,
    Loader2,
    FolderOpen,
    LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import MemberFooter from "../components/MemberFooter";
import MemberNavbar from "../components/MemberNavbar";

const MemberWorkspaces = () => {
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exitingWorkspace, setExitingWorkspace] = useState(null);

    const navigate = useNavigate();

    // Fetch member workspaces
    const fetchWorkspaces = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND}/member/memberworkspace`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setWorkspaces(res.data.workspaces || []);
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                    "Unable to fetch workspaces"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkspaces();
    }, []);

    // Open workspace
    const openWorkspace = (id) => {
        navigate(`/member-workspace/${id}`);
    };

    // Exit workspace
    const exitWorkspace = async (id) => {
        const confirmExit = window.confirm(
            "Are you sure you want to exit this workspace?"
        );

        if (!confirmExit) return;

        try {
            setExitingWorkspace(id);

            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND}/member/exitfromworkspace/${id}`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(
                    res.data.message || "Exited workspace successfully"
                );

                // Remove workspace from UI immediately
                setWorkspaces((prev) =>
                    prev.filter((workspace) => workspace._id !== id)
                );
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                    "Unable to exit workspace"
            );
        } finally {
            setExitingWorkspace(null);
        }
    };

    // Format date
    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-white">
                <div className="flex items-center gap-3 text-black/60">
                    <Loader2
                        size={20}
                        className="animate-spin"
                    />

                    <span className="text-sm font-medium">
                        Loading workspaces...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <>
            <MemberNavbar />

            <div className="min-h-[calc(100vh-72px)] bg-[#fafafa] text-black">
                <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                            <BriefcaseBusiness size={22} />
                        </div>

                        <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                            Your Workspaces
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-black/50 sm:text-base">
                            Workspaces you've joined and are currently
                            collaborating with your team.
                        </p>
                    </motion.div>

                    {/* No Workspaces */}
                    {workspaces.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-black/10 bg-white px-6 text-center shadow-sm"
                        >
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
                                <FolderOpen size={27} />
                            </div>

                            <h2 className="text-xl font-semibold">
                                No workspaces yet
                            </h2>

                            <p className="mt-2 max-w-md text-sm leading-6 text-black/50">
                                You haven't joined any workspace yet.
                                Once an owner adds you, the workspace will
                                appear here.
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Workspace Count */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.15 }}
                                className="mb-5 flex items-center justify-between"
                            >
                                <p className="text-sm font-medium text-black/50">
                                    {workspaces.length}{" "}
                                    {workspaces.length === 1
                                        ? "Workspace"
                                        : "Workspaces"}
                                </p>
                            </motion.div>

                            {/* Workspace Grid */}
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {workspaces.map((workspace, index) => (
                                    <motion.div
                                        key={workspace._id}
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.45,
                                            delay: index * 0.08,
                                        }}
                                        whileHover={{
                                            y: -4,
                                        }}
                                        className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)]"
                                    >
                                        {/* Workspace Image */}
                                        <div className="relative h-48 overflow-hidden bg-black">
                                            {workspace.photo ? (
                                                <img
                                                    src={workspace.photo}
                                                    alt={workspace.title}
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-black">
                                                    <BriefcaseBusiness
                                                        size={45}
                                                        className="text-white/80"
                                                    />
                                                </div>
                                            )}

                                            {/* Status */}
                                            <div className="absolute right-4 top-4">
                                                <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-black shadow-sm">
                                                    {workspace.status ||
                                                        "Active"}
                                                </span>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                        </div>

                                        {/* Workspace Content */}
                                        <div className="p-5">

                                            {/* Title */}
                                            <h2 className="truncate text-xl font-semibold tracking-[-0.025em]">
                                                {workspace.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-black/50">
                                                {workspace.description ||
                                                    "No description available."}
                                            </p>

                                            {/* Owner */}
                                            <div className="mt-5 flex items-center gap-3 border-t border-black/10 pt-5">
                                                {workspace.owner?.photo ? (
                                                    <img
                                                        src={workspace.owner.photo}
                                                        alt={
                                                            workspace.owner
                                                                ?.fullname ||
                                                            "Owner"
                                                        }
                                                        className="h-9 w-9 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                                                        <User size={16} />
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <p className="text-xs text-black/40">
                                                        Workspace Owner
                                                    </p>

                                                    <p className="truncate text-sm font-semibold">
                                                        {workspace.owner
                                                            ?.fullname ||
                                                            "Unknown"}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="mt-5 grid grid-cols-2 gap-3">

                                                {/* Members */}
                                                <div className="rounded-2xl bg-[#f7f7f7] p-3">
                                                    <div className="flex items-center gap-2 text-black/50">
                                                        <Users size={15} />

                                                        <span className="text-xs font-medium">
                                                            Members
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 text-lg font-semibold">
                                                        {workspace.members
                                                            ?.length || 0}
                                                    </p>
                                                </div>

                                                {/* Joined */}
                                                <div className="rounded-2xl bg-[#f7f7f7] p-3">
                                                    <div className="flex items-center gap-2 text-black/50">
                                                        <CalendarDays
                                                            size={15}
                                                        />

                                                        <span className="text-xs font-medium">
                                                            Joined
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 text-sm font-semibold">
                                                        {formatDate(
                                                            workspace.createdAt
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Team Members */}
                                            {workspace.members?.length > 0 && (
                                                <div className="mt-5">
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <span className="text-xs font-medium text-black/40">
                                                            Team members
                                                        </span>

                                                        <span className="text-xs font-semibold text-black/50">
                                                            {
                                                                workspace
                                                                    .members
                                                                    .length
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        {workspace.members
                                                            .slice(0, 5)
                                                            .map(
                                                                (
                                                                    member,
                                                                    memberIndex
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            member._id
                                                                        }
                                                                        className="relative -ml-2 first:ml-0"
                                                                        style={{
                                                                            zIndex:
                                                                                10 -
                                                                                memberIndex,
                                                                        }}
                                                                    >
                                                                        {member.photo ? (
                                                                            <img
                                                                                src={
                                                                                    member.photo
                                                                                }
                                                                                alt={
                                                                                    member.fullname
                                                                                }
                                                                                title={
                                                                                    member.fullname
                                                                                }
                                                                                className="h-8 w-8 rounded-full border-2 border-white object-cover"
                                                                            />
                                                                        ) : (
                                                                            <div
                                                                                title={
                                                                                    member.fullname
                                                                                }
                                                                                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black text-white"
                                                                            >
                                                                                <User
                                                                                    size={
                                                                                        13
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}

                                                        {/* More Members */}
                                                        {workspace.members
                                                            .length > 5 && (
                                                            <div className="relative -ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-[10px] font-semibold">
                                                                +
                                                                {workspace
                                                                    .members
                                                                    .length -
                                                                    5}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="mt-6 grid grid-cols-[1fr_auto] gap-3">

                                                {/* Open Workspace */}
                                                <button
                                                    onClick={() =>
                                                        openWorkspace(
                                                            workspace._id
                                                        )
                                                    }
                                                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                                                >
                                                    Open Workspace

                                                    <ArrowRight
                                                        size={16}
                                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                                    />
                                                </button>

                                                {/* Exit Workspace */}
                                                <button
                                                    onClick={() =>
                                                        exitWorkspace(
                                                            workspace._id
                                                        )
                                                    }
                                                    disabled={
                                                        exitingWorkspace ===
                                                        workspace._id
                                                    }
                                                    title="Exit Workspace"
                                                    className="flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 transition hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                    {exitingWorkspace ===
                                                    workspace._id ? (
                                                        <Loader2
                                                            size={17}
                                                            className="animate-spin"
                                                        />
                                                    ) : (
                                                        <LogOut size={17} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <MemberFooter />
        </>
    );
};

export default MemberWorkspaces;