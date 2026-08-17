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
    Send,
    User,
    UserRound,
    X,
} from "lucide-react";

import MemberNavbar from "../components/MemberNavbar";
import MemberFooter from "../components/MemberFooter";


const ParticularTasks = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submissionUrl, setSubmissionUrl] = useState("");
    const [submissionNote, setSubmissionNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchTask = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND}/member/particulartask/${id}`,
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
            console.log("Particular Task Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Unable to fetch task"
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

    const openSubmitModal = () => {

        setSubmissionUrl(task?.submissionUrl || "");
        setSubmissionNote(task?.submissionNote || "");
        setShowSubmitModal(true);
    };

    const closeSubmitModal = () => {
        if (submitting) return;

        setShowSubmitModal(false);
        setSubmissionUrl("");
        setSubmissionNote("");
    };

    const handleSubmitTask = async (e) => {
        e.preventDefault();

        if (!submissionUrl.trim()) {
            toast.error("Please enter the work URL");
            return;
        }

        try {
            setSubmitting(true);

            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND}/member/sendurl/${id}`,
                {
                    submissionUrl: submissionUrl.trim(),

                    submissionNote: submissionNote.trim(),
                },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(
                    res.data.message || "Task submitted for review"
                );

                setShowSubmitModal(false);
                setSubmissionUrl("");
                setSubmissionNote("");

                await fetchTask();
            } else {
                toast.error(
                    res.data.message || "Unable to submit task"
                );

            }
        } catch (error) {
            console.log("Submit Task Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Unable to submit task"
            );
        } finally {
            setSubmitting(false);
        }
    };

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
            case "Progress":
                return {
                    label: "In Progress",
                    className:
                        "border-blue-200 bg-blue-50 text-blue-700",
                    icon: Clock3,
                };

            case "Completed":
                return {
                    label: "Completed",
                    className:
                        "border-emerald-200 bg-emerald-50 text-emerald-700",
                    icon: CheckCircle2,
                };

            case "Review":
                return {
                    label: "Under Review",
                    className:
                        "border-purple-200 bg-purple-50 text-purple-700",
                    icon: ClipboardCheck,
                };

            case "Rejected":
                return {
                    label: "Rejected",
                    className:
                        "border-red-200 bg-red-50 text-red-700",
                    icon: Clock3,
                };

            default:
                return {
                    label: "Pending",
                    className:
                        "border-amber-200 bg-amber-50 text-amber-700",
                    icon: Clock3,
                };
        }
    };

    const isOverdue = () => {
        if (!task?.dueDate) return false;

        if (
            task.status === "Completed" ||
            task.status === "Review"
        ) {
            return false;
        }

        return new Date(task.dueDate) < new Date();
    };

    const rejectionNote =
        task?.rejectionNote ||
        task?.rejectionReason ||
        task?.rejectNote ||
        "";

    if (loading) {
        return (
            <>
                <MemberNavbar />

                <main className="min-h-screen bg-[#fafafa] px-5 py-10">
                    <div className="mx-auto max-w-6xl">
                        <div className="animate-pulse">
                            <div className="h-5 w-28 rounded bg-black/10" />

                            <div className="mt-8 h-10 w-2/3 rounded-lg bg-black/10" />


                            <div className="mt-4 h-5 w-1/2 rounded bg-black/5" />

                            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
                                <div className="h-[420px] rounded-2xl bg-black/5" />
                                <div className="h-[420px] rounded-2xl bg-black/5" />
                            </div>
                        </div>
                    </div>
                </main>

                <MemberFooter />
            </>
        );
    }

    if (!task) {
        return (
            <>
                <MemberNavbar />

                <main className="flex min-h-[70vh] items-center justify-center bg-[#fafafa] px-5">
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

                <MemberFooter />
            </>
        );
    }

    const statusConfig = getStatus(task.status);
    const StatusIcon = statusConfig.icon;

    return (
        <>
            <MemberNavbar />

            <main className="min-h-screen bg-[#fafafa] text-black">
                <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate(-1)}
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-black/50 transition hover:text-black"
                    >
                        <ArrowLeft size={17} />
                        Back to Tasks
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

                            {isOverdue() && (
                                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                                    Overdue
                                </div>
                            )}
                        </div>

                        <h1 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            {task.title}
                        </h1>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-black/45 sm:text-base">
                            Review the task details, deadline and current
                            progress below.
                        </p>
                    </motion.div>

                    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_330px]">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                                    <ClipboardCheck size={19} />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                                        Task Details
                                    </p>

                                    <p className="mt-0.5 text-sm font-medium">
                                        What needs to be completed
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

                            {task.status === "Rejected" && (
                                <div className="mt-8 overflow-hidden rounded-2xl border border-red-200 bg-red-50">
                                    <div className="flex items-start gap-3 border-b border-red-200 px-5 py-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                                            <X size={19} />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-red-700">
                                                Task Rejected
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-red-600/70">
                                                The owner reviewed your
                                                submission and requested
                                                changes.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="px-5 py-5">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-red-700/60">
                                            Rejection Reason
                                        </p>

                                        <div className="mt-3 rounded-xl border border-red-200 bg-white p-4">
                                            <p className="whitespace-pre-wrap text-sm leading-6 text-red-800/80">
                                                {rejectionNote ||
                                                    "The owner rejected this task without providing a specific reason."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(task.status === "Pending" ||
                                task.status === "Rejected") && (
                                    <div
                                        className={`mt-8 rounded-2xl border p-5 ${task.status === "Rejected"
                                                ? "border-red-200 bg-red-50"
                                                : "border-blue-200 bg-blue-50"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white ${task.status === "Rejected"
                                                        ? "bg-red-600"
                                                        : "bg-black"
                                                    }`}
                                            >
                                                <Send size={18} />
                                            </div>

                                            <div className="flex-1">
                                                <h3
                                                    className={`text-sm font-bold ${task.status === "Rejected"
                                                            ? "text-red-700"
                                                            : "text-black"
                                                        }`}
                                                >
                                                    {task.status === "Rejected"
                                                        ? "Resubmit your task"
                                                        : "Finished the task?"}
                                                </h3>

                                                <p
                                                    className={`mt-1 text-xs leading-5 ${task.status === "Rejected"
                                                            ? "text-red-600/70"
                                                            : "text-black/50"
                                                        }`}
                                                >
                                                    {task.status === "Rejected"
                                                        ? "Update your work according to the owner's feedback and submit it again for review."
                                                        : "Submit your completed work URL and a short note to send this task to the owner for review."}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={openSubmitModal}
                                            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition active:scale-[0.99] ${task.status === "Rejected"
                                                    ? "bg-red-600 hover:bg-red-700"
                                                    : "bg-black hover:bg-black/80"
                                                }`}
                                        >
                                            <Send size={17} />
                                            {task.status === "Rejected"
                                                ? "Resubmit Task"
                                                : "Submit for Review"}
                                        </button>
                                    </div>
                                )}

                            <div className="mt-8 border-t border-black/10 pt-6">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-black/30">
                                    Task ID
                                </p>

                                <p className="mt-2 break-all font-mono text-xs text-black/45">
                                    {task._id}
                                </p>
                            </div>

                            {(task.status === "Review" ||
                                task.status === "Rejected") &&
                                task.submissionUrl && (
                                    <div className="mt-8 border-t border-black/10 pt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white">
                                                <Send size={18} />
                                            </div>

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                                                    Submission
                                                </p>

                                                <p className="mt-0.5 text-sm font-medium">
                                                    {task.status === "Rejected"
                                                        ? "Previous submission"
                                                        : "Submitted for review"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <p className="text-xs font-semibold text-black/40">
                                                Submitted Work
                                            </p>

                                            <a
                                                href={task.submissionUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-2 flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm font-medium text-purple-700 transition hover:bg-purple-100"
                                            >
                                                <Link
                                                    size={16}
                                                    className="shrink-0"
                                                />

                                                <span className="min-w-0 flex-1 break-all">
                                                    {task.submissionUrl}
                                                </span>

                                                <ExternalLink
                                                    size={15}
                                                    className="shrink-0"
                                                />
                                            </a>
                                        </div>

                                        {task.submissionNote && (
                                            <div className="mt-5">
                                                <p className="text-xs font-semibold text-black/40">
                                                    Submission Note
                                                </p>

                                                <div className="mt-2 rounded-xl border border-black/10 bg-[#fafafa] p-4">
                                                    <p className="whitespace-pre-wrap text-sm leading-6 text-black/65">
                                                        {task.submissionNote}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
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

                                {task.status === "Rejected" && (
                                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-red-700">
                                            <X size={17} />
                                            Changes Required
                                        </div>

                                        <p className="mt-2 text-xs leading-5 text-red-700/70">
                                            Review the owner's feedback and
                                            resubmit your updated work.
                                        </p>
                                    </div>
                                )}

                                {task.status === "Review" && (
                                    <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50 p-4">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-purple-700">
                                            <ClipboardCheck size={17} />
                                            Task Under Review
                                        </div>

                                        <p className="mt-2 text-xs leading-5 text-purple-700/70">
                                            Your submission has been sent to
                                            the owner for verification.
                                        </p>
                                    </div>
                                )}

                                {task.status === "Completed" && (
                                    <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                                        <CheckCircle2 size={17} />
                                        Task Completed
                                    </div>
                                )}
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

                                            <p
                                                className={`mt-1 text-sm font-semibold ${isOverdue()
                                                        ? "text-red-600"
                                                        : ""
                                                    }`}
                                            >
                                                {formatDate(task.dueDate)}
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
                                                <Send
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

                                        <p className="mt-0.5 text-xs text-black/40">
                                            Assigned workspace
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                                    Assigned To
                                </p>

                                <div className="mt-4 flex items-center gap-3">
                                    {task.assignedTo?.photo ? (
                                        <img
                                            src={task.assignedTo.photo}
                                            alt={
                                                task.assignedTo.fullname ||
                                                "Member"
                                            }
                                            className="h-10 w-10 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.05]">
                                            <UserRound
                                                size={18}
                                                className="text-black/50"
                                            />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {task.assignedTo?.fullname ||
                                                "You"}
                                        </p>

                                        <p className="mt-0.5 truncate text-xs text-black/40">
                                            {task.assignedTo?.email ||
                                                "Assigned member"}
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
                                            className="h-10 w-10 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.05]">
                                            <User
                                                size={18}
                                                className="text-black/50"
                                            />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {task.createdBy?.fullname ||
                                                "Workspace Owner"}
                                        </p>

                                        <p className="mt-0.5 truncate text-xs text-black/40">
                                            {task.createdBy?.email ||
                                                "Owner"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </main>

            {showSubmitModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 py-8 backdrop-blur-sm"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            closeSubmitModal();
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
                        transition={{
                            duration: 0.2,
                        }}
                        className="w-full max-w-lg overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl"
                    >
                        <div className="border-b border-black/10 px-6 py-5 sm:px-7">
                            <div className="flex items-start justify-between gap-5">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                                        <Send size={19} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold">
                                            Submit Task for Review
                                        </h2>

                                        <p className="mt-1 text-sm leading-5 text-black/45">
                                            Send your completed work to the
                                            owner for verification.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={closeSubmitModal}
                                    disabled={submitting}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-black/40 transition hover:bg-black/[0.05] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <X size={19} />
                                </button>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmitTask}
                            className="px-6 py-6 sm:px-7"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Work URL
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <Link
                                        size={17}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35"
                                    />

                                    <input
                                        type="url"
                                        value={submissionUrl}
                                        onChange={(e) =>
                                            setSubmissionUrl(
                                                e.target.value
                                            )
                                        }
                                        placeholder="https://github.com/..."
                                        className="w-full rounded-xl border border-black/10 bg-[#fafafa] py-3.5 pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-black/30 focus:bg-white"
                                        required
                                    />
                                </div>

                                <p className="mt-2 text-xs leading-5 text-black/40">
                                    Add the link where the owner can check
                                    your completed work.
                                </p>
                            </div>

                            <div className="mt-5">
                                <label className="mb-2 block text-sm font-semibold">
                                    Submission Note
                                    <span className="ml-1 font-normal text-black/35">
                                        (optional)
                                    </span>
                                </label>

                                <textarea
                                    value={submissionNote}
                                    onChange={(e) =>
                                        setSubmissionNote(
                                            e.target.value
                                        )
                                    }
                                    rows={5}
                                    placeholder="Briefly explain what you completed..."
                                    className="w-full resize-none rounded-xl border border-black/10 bg-[#fafafa] p-4 text-sm leading-6 text-black outline-none transition placeholder:text-black/30 focus:border-black/30 focus:bg-white"
                                />

                                <p className="mt-2 text-xs leading-5 text-black/40">
                                    Example: Completed the dashboard UI,
                                    API integration and responsive layout.
                                </p>
                            </div>

                            <div className="mt-5 flex gap-3 rounded-xl border border-purple-200 bg-purple-50 p-4">
                                <ClipboardCheck
                                    size={18}
                                    className="mt-0.5 shrink-0 text-purple-600"
                                />

                                <p className="text-xs leading-5 text-purple-700">
                                    After submitting, the task will be sent
                                    to the owner for review.
                                </p>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    type="button"
                                    onClick={closeSubmitModal}
                                    disabled={submitting}
                                    className="flex-1 rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-black transition hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} />
                                            Submit
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <MemberFooter />
        </>
    );
};

export default ParticularTasks;
