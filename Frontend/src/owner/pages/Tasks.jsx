import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Clock3,
    ClipboardList,
    FolderKanban,
    Loader2,
    Search,
    User,
    AlertCircle,
} from "lucide-react";
import OwnerNavbar from "../components/OwnerNavbar";

import { IoOpenOutline } from "react-icons/io5";
import OwnerFooter from "../components/OwnerFooter";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const fetchTasks = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND}/owner/gettasks`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setTasks(res.data.tasks || []);
            } else {
                toast.error(
                    res.data.message || "Unable to fetch tasks"
                );
            }
        } catch (error) {
            console.log("Fetch Tasks Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Unable to fetch tasks"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const searchValue = search.toLowerCase().trim();

            const matchesSearch =
                task.title?.toLowerCase().includes(searchValue) ||
                task.description?.toLowerCase().includes(searchValue) ||
                task.workspace?.title
                    ?.toLowerCase()
                    .includes(searchValue) ||
                task.assignedTo?.fullname
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                statusFilter === "All" ||
                task.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [tasks, search, statusFilter]);

    const totalTasks = tasks.length;


    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const progressTasks = tasks.filter(
        (task) => task.status === "Progress"
    ).length;


    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;


    const getStatusConfig = (status) => {
        switch (status) {
            case "Completed":
                return {
                    icon: CheckCircle2,
                    label: "Completed",
                    className:
                        "bg-emerald-50 text-emerald-700 border-emerald-200",
                };

            case "Progress":
                return {
                    icon: Clock3,
                    label: "In Progress",
                    className:
                        "bg-blue-50 text-blue-700 border-blue-200",
                };

            case "Approved":
                return {
                    icon: CheckCircle2,
                    label: "Approved",
                    className:
                        "bg-purple-50 text-purple-700 border-purple-200",
                };

            case "Rejected":
                return {
                    icon: AlertCircle,
                    label: "Rejected",
                    className:
                        "bg-red-50 text-red-700 border-red-200",
                };

            default:
                return {
                    icon: Clock3,
                    label: "Pending",
                    className:
                        "bg-amber-50 text-amber-700 border-amber-200",
                };
        }
    };

    const formatDate = (date) => {
        if (!date) return "No date";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const isOverdue = (task) => {
        if (!task.dueDate) return false;

        if (
            task.status === "Completed" ||
            task.status === "Approved"
        ) {
            return false;
        }

        return new Date(task.dueDate) < new Date();
    };

    if (loading) {
        return (
            <>
                <OwnerNavbar />

                <div className="min-h-screen bg-[#fafafa] px-5 py-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="animate-pulse">
                            <div className="h-10 w-52 rounded-xl bg-black/10" />

                            <div className="mt-3 h-5 w-80 rounded-lg bg-black/5" />

                            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="h-28 rounded-2xl bg-black/5"
                                    />
                                ))}
                            </div>

                            <div className="mt-8 h-[500px] rounded-2xl bg-black/5" />
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

            <div className="min-h-screen bg-[#fafafa] text-black">
                <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <div className="mb-3 flex items-center gap-2 text-sm text-black/45">
                                    <ClipboardList size={17} />
                                    <span>Task Management</span>
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    All Tasks
                                </h1>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-black/45 sm:text-base">
                                    Track tasks across your workspaces,
                                    monitor progress and manage your team.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        <div className="rounded-2xl border border-black/10 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                                        Total Tasks
                                    </p>

                                    <p className="mt-2 text-3xl font-bold">
                                        {totalTasks}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                                    <ClipboardList size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                                        Pending
                                    </p>

                                    <p className="mt-2 text-3xl font-bold">
                                        {pendingTasks}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                    <Clock3 size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                                        In Progress
                                    </p>

                                    <p className="mt-2 text-3xl font-bold">
                                        {progressTasks}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Clock3 size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                                        Completed
                                    </p>

                                    <p className="mt-2 text-3xl font-bold">
                                        {completedTasks}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <CheckCircle2 size={20} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="relative w-full sm:max-w-md">
                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
                            />

                            <input
                                type="text"
                                placeholder="Search tasks, workspaces or members..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="h-12 w-full rounded-xl border border-black/10 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30"
                            />
                        </div>

                        <div className="relative w-full sm:w-auto">
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="h-12 w-full appearance-none rounded-xl border border-black/10 bg-white px-4 pr-12 text-sm outline-none transition focus:border-black/30 sm:w-44"
                            >
                                <option value="All">
                                    All Status
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Progress">
                                    In Progress
                                </option>

                                <option value="Approved">
                                    Approved
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>

                                <option value="Rejected">
                                    Rejected
                                </option>
                            </select>

                            <ChevronDown
                                size={18}
                                strokeWidth={2}
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/60"
                            />
                        </div>
                    </motion.div>

                    {filteredTasks.length === 0 ? (
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.98,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 bg-white px-6 text-center"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
                                <ClipboardList size={27} />
                            </div>

                            <h2 className="mt-5 text-lg font-semibold">
                                {search ||
                                    statusFilter !== "All"
                                    ? "No tasks found"
                                    : "No tasks yet"}
                            </h2>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-black/45">
                                {search ||
                                    statusFilter !== "All"
                                    ? "Try changing your search or status filter."
                                    : "Tasks created for your workspaces will appear here."}
                            </p>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence>
                                {filteredTasks.map(
                                    (task, index) => {
                                        const statusConfig =
                                            getStatusConfig(
                                                task.status
                                            );

                                        const StatusIcon =
                                            statusConfig.icon;

                                        const overdue =
                                            isOverdue(task);

                                        return (
                                            <motion.div
                                                key={task._id}
                                                initial={{
                                                    opacity: 0,
                                                    y: 15,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.98,
                                                }}
                                                transition={{
                                                    delay:
                                                        index *
                                                        0.04,
                                                }}
                                                className="group rounded-2xl border border-black/10 bg-white p-5 transition hover:border-black/20 hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:p-6"
                                            >
                                                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <div className="flex items-center gap-1.5 rounded-lg bg-black/[0.04] px-2.5 py-1.5 text-xs font-medium text-black/60">
                                                                <FolderKanban
                                                                    size={
                                                                        13
                                                                    }
                                                                />

                                                                <span className="max-w-[220px] truncate">
                                                                    {task
                                                                        .workspace
                                                                        ?.title ||
                                                                        "Unknown Workspace"}
                                                                </span>
                                                            </div>

                                                            <div
                                                                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${statusConfig.className}`}
                                                            >
                                                                <StatusIcon
                                                                    size={
                                                                        13
                                                                    }
                                                                />

                                                                {
                                                                    statusConfig.label
                                                                }
                                                            </div>

                                                            {overdue && (
                                                                <div className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600">
                                                                    <AlertCircle
                                                                        size={
                                                                            13
                                                                        }
                                                                    />

                                                                    Overdue
                                                                </div>
                                                            )}
                                                        </div>

                                                        <h2 className="mt-3 truncate text-lg font-semibold tracking-tight sm:text-xl">
                                                            {
                                                                task.title
                                                            }
                                                        </h2>

                                                        <p className="mt-1 line-clamp-2 max-w-3xl text-sm leading-6 text-black/45">
                                                            {
                                                                task.description
                                                            }
                                                        </p>

                                                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-black/45">
                                                            <div className="flex items-center gap-1.5">
                                                                <User
                                                                    size={
                                                                        14
                                                                    }
                                                                />

                                                                <span>
                                                                    Assigned
                                                                    to{" "}
                                                                    <span className="font-semibold text-black/70">
                                                                        {task
                                                                            .assignedTo
                                                                            ?.fullname ||
                                                                            "Unknown member"}
                                                                    </span>
                                                                </span>
                                                            </div>

                                                            <div
                                                                className={`flex items-center gap-1.5 ${overdue
                                                                    ? "font-semibold text-red-500"
                                                                    : ""
                                                                    }`}
                                                            >
                                                                <CalendarDays
                                                                    size={
                                                                        14
                                                                    }
                                                                />

                                                                <span>
                                                                    Due{" "}
                                                                    {formatDate(
                                                                        task.dueDate
                                                                    )}
                                                                </span>
                                                            </div>


                                                            <div
                                                                onClick={() => navigate(`/owner-task-response/${task._id}`)}
                                                                className={`flex items-center cursor-pointer gap-1.5 ${overdue
                                                                    ? "font-semibold text-red-500"
                                                                    : ""
                                                                    }`}
                                                            >
                                                                <IoOpenOutline
                                                                    size={
                                                                        14
                                                                    }
                                                                />

                                                                <span>
                                                                    Open
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex shrink-0 items-center justify-between border-t border-black/10 pt-4 lg:block lg:border-t-0 lg:pt-0 lg:text-right">
                                                        <div>
                                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-black/30">
                                                                Created
                                                            </p>

                                                            <p className="mt-1 text-xs font-medium text-black/55">
                                                                {formatDate(
                                                                    task.createdAt
                                                                )}
                                                            </p>
                                                        </div>

                                                        <div className="mt-0 lg:mt-4">
                                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-black/30">
                                                                Task ID
                                                            </p>

                                                            <p className="mt-1 font-mono text-[10px] text-black/35">
                                                                {task._id?.slice(
                                                                    -8
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    }
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </main>
            </div>

            <OwnerFooter />
        </>
    );
};

export default Tasks;