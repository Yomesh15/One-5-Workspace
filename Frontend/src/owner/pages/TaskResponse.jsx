import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    ClipboardCheck,
    ExternalLink,
    FolderKanban,
    Link,
    User,
    UserRound,
    X,
    XCircle,
} from "lucide-react";

import OwnerNavbar from "../components/OwnerNavbar";
import OwnerFooter from "../components/OwnerFooter";

const TaskResponse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectNote, setRejectNote] = useState("");
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const fetchTask = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND}/owner/particulartask/${id}`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setTask(res.data.task);
            } else {
                toast.error(res.data.message || "Unable to fetch task");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to fetch task"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchTask();
        }
    }, [id]);

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatDateTime = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatus = (status) => {
        switch (status) {
            case "Pending":
                return {
                    label: "Pending",
                    className:
                        "border-amber-200 bg-amber-50 text-amber-700",
                    icon: Clock3,
                };

            case "Progress":
                return {
                    label: "In Progress",
                    className:
                        "border-blue-200 bg-blue-50 text-blue-700",
                    icon: Clock3,
                };

            case "Review":
                return {
                    label: "Under Review",
                    className:
                        "border-purple-200 bg-purple-50 text-purple-700",
                    icon: ClipboardCheck,
                };

            case "Completed":
                return {
                    label: "Completed",
                    className:
                        "border-emerald-200 bg-emerald-50 text-emerald-700",
                    icon: CheckCircle2,
                };

            case "Rejected":
                return {
                    label: "Rejected",
                    className:
                        "border-red-200 bg-red-50 text-red-700",
                    icon: XCircle,
                };

            default:
                return {
                    label: status || "Unknown",
                    className:
                        "border-black/10 bg-black/[0.04] text-black/60",
                    icon: Clock3,
                };
        }
    };

    const updateTaskStatus = async (status, note = "") => {
        try {
            setUpdatingStatus(true);

            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND}/owner/task-response/${id}`,
                {
                    status,
                    note,
                },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setTask(res.data.task);

                if (status === "Completed") {
                    toast.success("Task accepted successfully");
                } else {
                    toast.success("Task rejected successfully");
                    setShowRejectModal(false);
                    setRejectNote("");
                }
            } else {
                toast.error(
                    res.data.message || "Unable to update task"
                );
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to update task"
            );
        } finally {
            setUpdatingStatus(false);
        }
    };

    const handleAccept = () => {
        updateTaskStatus("Completed");
    };

    const handleReject = (e) => {
        e.preventDefault();

        if (!rejectNote.trim()) {
            toast.error("Please enter a rejection note");
            return;
        }

        updateTaskStatus("Rejected", rejectNote.trim());
    };

    const closeRejectModal = () => {
        if (updatingStatus) return;

        setShowRejectModal(false);
        setRejectNote("");
    };

    if (loading) {
        return (
            <>
                <OwnerNavbar />

                <main className="min-h-screen bg-[#fafafa] px-5 py-10">
                    <div className="mx-auto max-w-6xl animate-pulse">
                        <div className="h-5 w-28 rounded bg-black/10" />
                        <div className="mt-8 h-12 w-2/3 rounded-lg bg-black/10" />
                        <div className="mt-4 h-5 w-1/2 rounded bg-black/5" />

                        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
                            <div className="h-[600px] rounded-2xl bg-black/5" />
                            <div className="h-[500px] rounded-2xl bg-black/5" />
                        </div>
                    </div>
                </main>

                <OwnerFooter />
            </>
        );
    }

    if (!task) {
        return (
            <>
                <OwnerNavbar />

                <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-5">
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
                            <ClipboardCheck size={28} />
                        </div>

                        <h1 className="mt-5 text-xl font-bold">
                            Task not found
                        </h1>

                        <p className="mt-2 text-sm text-black/45">
                            This task may have been removed or is no
                            longer available.
                        </p>

                        <button
                            onClick={() => navigate(-1)}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
                        >
                            <ArrowLeft size={16} />
                            Go Back
                        </button>
                    </div>
                </main>

                <OwnerFooter />
            </>
        );
    }

    const statusConfig = getStatus(task.status);
    const StatusIcon = statusConfig.icon;

    return (
        <>
            <OwnerNavbar />

            <main className="min-h-screen bg-[#fafafa] text-black">
                <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate(-1)}
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-black/50 transition hover:text-black"
                    >
                        <ArrowLeft size={17} />
                        Back
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="inline-flex items-center gap-2 rounded-lg bg-black/[0.04] px-3 py-1.5 text-xs font-medium text-black/55">
                                <FolderKanban size={14} />
                                {task.workspace?.title ||
                                    "Unknown Workspace"}
                            </div>

                            <div
                                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${statusConfig.className}`}
                            >
                                <StatusIcon size={14} />
                                {statusConfig.label}
                            </div>
                        </div>

                        <h1 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            {task.title}
                        </h1>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-black/45 sm:text-base">
                            Review the task details and the work
                            submitted by the assigned member.
                        </p>
                    </motion.div>

                    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="space-y-6"
                        >
                            <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                                        <ClipboardCheck size={19} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                                            Task Details
                                        </p>

                                        <p className="mt-0.5 text-sm font-medium">
                                            Task information
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-sm font-semibold text-black/45">
                                        Description
                                    </h2>

                                    <div className="mt-3 rounded-xl border border-black/10 bg-[#fafafa] p-5">
                                        <p className="whitespace-pre-wrap text-sm leading-7 text-black/70">
                                            {task.description ||
                                                "No description provided."}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-xl border border-black/10 bg-[#fafafa] p-4">
                                        <p className="text-xs text-black/40">
                                            Created
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {formatDateTime(
                                                task.createdAt
                                            )}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-black/10 bg-[#fafafa] p-4">
                                        <p className="text-xs text-black/40">
                                            Due Date
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {formatDate(task.dueDate)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-black/10 pt-6">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-black/30">
                                        Task ID
                                    </p>

                                    <p className="mt-2 break-all font-mono text-xs text-black/45">
                                        {task._id}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white">
                                        <Link size={19} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                                            Member Response
                                        </p>

                                        <p className="mt-0.5 text-sm font-medium">
                                            Submitted work and message
                                        </p>
                                    </div>
                                </div>

                                {task.submissionUrl ? (
                                    <>
                                        <div className="mt-8">
                                            <div className="flex items-center justify-between gap-3">
                                                <h2 className="text-sm font-semibold text-black/45">
                                                    Submitted Work
                                                </h2>

                                                {task.submittedAt && (
                                                    <span className="text-xs text-black/35">
                                                        {formatDateTime(
                                                            task.submittedAt
                                                        )}
                                                    </span>
                                                )}
                                            </div>

                                            <a
                                                href={task.submissionUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-3 flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm font-medium text-purple-700 transition hover:bg-purple-100"
                                            >
                                                <Link
                                                    size={17}
                                                    className="shrink-0"
                                                />

                                                <span className="min-w-0 flex-1 break-all">
                                                    {
                                                        task.submissionUrl
                                                    }
                                                </span>

                                                <ExternalLink
                                                    size={16}
                                                    className="shrink-0"
                                                />
                                            </a>
                                        </div>

                                        <div className="mt-6">
                                            <h2 className="text-sm font-semibold text-black/45">
                                                Submission Note
                                            </h2>

                                            <div className="mt-3 rounded-xl border border-black/10 bg-[#fafafa] p-5">
                                                <p className="whitespace-pre-wrap text-sm leading-7 text-black/65">
                                                    {task.submissionNote ||
                                                        "No submission note provided."}
                                                </p>
                                            </div>
                                        </div>

                                        {task.submittedAt && (
                                            <div className="mt-6 flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50 p-4">
                                                <Clock3
                                                    size={18}
                                                    className="shrink-0 text-purple-600"
                                                />

                                                <div>
                                                    <p className="text-xs text-purple-700/60">
                                                        Submitted At
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-purple-700">
                                                        {formatDateTime(
                                                            task.submittedAt
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {task.status === "Review" && (
                                            <div className="mt-8 border-t border-black/10 pt-6">
                                                <div className="flex flex-col gap-3 sm:flex-row">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowRejectModal(
                                                                true
                                                            )
                                                        }
                                                        disabled={
                                                            updatingStatus
                                                        }
                                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <XCircle size={17} />
                                                        Reject
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={handleAccept}
                                                        disabled={
                                                            updatingStatus
                                                        }
                                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {updatingStatus ? (
                                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                        ) : (
                                                            <CheckCircle2
                                                                size={17}
                                                            />
                                                        )}

                                                        Accept & Complete
                                                    </button>
                                                </div>

                                                <p className="mt-3 text-center text-xs text-black/35">
                                                    Accept the submission to
                                                    complete the task or
                                                    reject it with a reason
                                                    for changes.
                                                </p>
                                            </div>
                                        )}

                                        {task.status === "Rejected" &&
                                            task.rejectionNote && (
                                                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
                                                        Rejection Note
                                                    </p>

                                                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-red-700">
                                                        {
                                                            task.rejectionNote
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                        {task.status === "Completed" && (
                                            <div className="mt-8 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                                <CheckCircle2
                                                    size={20}
                                                    className="shrink-0 text-emerald-600"
                                                />

                                                <div>
                                                    <p className="text-sm font-semibold text-emerald-700">
                                                        Task Accepted
                                                    </p>

                                                    <p className="mt-1 text-xs text-emerald-700/60">
                                                        This submission has
                                                        been approved and the
                                                        task is completed.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="mt-8 rounded-xl border border-black/10 bg-[#fafafa] p-8 text-center">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-black/[0.05]">
                                            <Link
                                                size={20}
                                                className="text-black/40"
                                            />
                                        </div>

                                        <p className="mt-4 text-sm font-semibold">
                                            No submission yet
                                        </p>

                                        <p className="mt-1 text-xs text-black/40">
                                            The member has not submitted any
                                            work for this task.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.section>

                        <motion.aside
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.14 }}
                            className="space-y-6"
                        >
                            <div className="rounded-2xl border border-black/10 bg-white p-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                                    Current Status
                                </p>

                                <div
                                    className={`mt-4 flex items-center gap-3 rounded-xl border p-4 ${statusConfig.className}`}
                                >
                                    <StatusIcon size={20} />

                                    <div>
                                        <p className="text-sm font-bold">
                                            {statusConfig.label}
                                        </p>

                                        <p className="mt-0.5 text-xs opacity-70">
                                            Task status
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                                    Assigned Member
                                </p>

                                <div className="mt-4 flex items-center gap-3">
                                    {task.assignedTo?.photo ? (
                                        <img
                                            src={task.assignedTo.photo}
                                            alt={
                                                task.assignedTo.fullname ||
                                                "Member"
                                            }
                                            className="h-12 w-12 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/[0.05]">
                                            <UserRound
                                                size={20}
                                                className="text-black/50"
                                            />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {task.assignedTo?.fullname ||
                                                "Member"}
                                        </p>

                                        <p className="mt-1 truncate text-xs text-black/40">
                                            {task.assignedTo?.email ||
                                                "No email"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                                    Workspace
                                </p>

                                <div className="mt-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                                        <FolderKanban size={18} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {task.workspace?.title ||
                                                "Unknown Workspace"}
                                        </p>

                                        <p className="mt-1 text-xs text-black/40">
                                            Assigned workspace
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                                    Created By
                                </p>

                                <div className="mt-4 flex items-center gap-3">
                                    {task.createdBy?.photo ? (
                                        <img
                                            src={task.createdBy.photo}
                                            alt={
                                                task.createdBy.fullname ||
                                                "Owner"
                                            }
                                            className="h-12 w-12 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/[0.05]">
                                            <User
                                                size={20}
                                                className="text-black/50"
                                            />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {task.createdBy?.fullname ||
                                                "Workspace Owner"}
                                        </p>

                                        <p className="mt-1 truncate text-xs text-black/40">
                                            {task.createdBy?.email ||
                                                "Owner"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                                    Timeline
                                </p>

                                <div className="mt-5 space-y-5">
                                    <div className="flex gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/[0.04]">
                                            <CalendarDays
                                                size={17}
                                                className="text-black/55"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-black/40">
                                                Due Date
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {formatDate(
                                                    task.dueDate
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/[0.04]">
                                            <Clock3
                                                size={17}
                                                className="text-black/55"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-black/40">
                                                Created
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {formatDateTime(
                                                    task.createdAt
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {task.submittedAt && (
                                        <div className="flex gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                                                <CheckCircle2
                                                    size={17}
                                                    className="text-purple-600"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs text-black/40">
                                                    Submitted
                                                </p>

                                                <p className="mt-1 text-sm font-semibold">
                                                    {formatDateTime(
                                                        task.submittedAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                </div>

                {showRejectModal && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 py-8 backdrop-blur-sm"
                        onMouseDown={(e) => {
                            if (e.target === e.currentTarget) {
                                closeRejectModal();
                            }
                        }}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.96,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-lg overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl"
                        >
                            <div className="border-b border-black/10 px-6 py-5 sm:px-7">
                                <div className="flex items-start justify-between gap-5">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                                            <XCircle size={20} />
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-bold">
                                                Reject Task
                                            </h2>

                                            <p className="mt-1 text-sm leading-5 text-black/45">
                                                Tell the member what needs
                                                to be changed or completed.
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={closeRejectModal}
                                        disabled={updatingStatus}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-black/40 transition hover:bg-black/[0.05] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <X size={19} />
                                    </button>
                                </div>
                            </div>

                            <form
                                onSubmit={handleReject}
                                className="px-6 py-6 sm:px-7"
                            >
                                <label className="mb-2 block text-sm font-semibold">
                                    Rejection Note
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    value={rejectNote}
                                    onChange={(e) =>
                                        setRejectNote(e.target.value)
                                    }
                                    rows={6}
                                    placeholder="Explain what the member needs to change..."
                                    className="w-full resize-none rounded-xl border border-black/10 bg-[#fafafa] p-4 text-sm leading-6 text-black outline-none transition placeholder:text-black/30 focus:border-red-300 focus:bg-white"
                                    required
                                    disabled={updatingStatus}
                                />

                                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
                                    <p className="text-xs leading-5 text-red-700">
                                        The member will see this note and can
                                        update the task before submitting it
                                        again.
                                    </p>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={closeRejectModal}
                                        disabled={updatingStatus}
                                        className="flex-1 rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-black transition hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={
                                            updatingStatus ||
                                            !rejectNote.trim()
                                        }
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {updatingStatus ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Rejecting...
                                            </>
                                        ) : (
                                            <>
                                                <XCircle size={16} />
                                                Reject Task
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                        </motion.div>
                    </div>
                )}
            </main>

            <OwnerFooter />
        </>
    );
};

export default TaskResponse;