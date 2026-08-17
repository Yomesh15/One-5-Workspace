import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    ClipboardPlus,
    User,
} from "lucide-react";
import { motion } from "framer-motion";
import OwnerNavbar from "../components/OwnerNavbar";
import OwnerFooter from "../components/OwnerFooter";

const CreateTask = () => {
    
    const { id } = useParams();

    const navigate = useNavigate();

    const [workspace, setWorkspace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
    });
 
    const fetchWorkspace = async () => {
        if (!id) {
            toast.error("Workspace ID is missing");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            console.log("Fetching workspace:", id);

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND}/owner/particularworkspace/${id}`,
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
            console.log("Fetch Workspace Error:", error);

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
 
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            toast.error("Workspace ID is missing");
            return;
        }

        if (!formData.title.trim()) {
            toast.error("Task title is required");
            return;
        }

        if (!formData.description.trim()) {
            toast.error("Task description is required");
            return;
        }

        if (!formData.assignedTo) {
            toast.error("Please select a member");
            return;
        }

        if (!formData.dueDate) {
            toast.error("Please select a due date");
            return;
        }

        // Extra frontend date validation
        const selectedDate = new Date(formData.dueDate);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate <= today) {
            toast.error("Due date must be a future date");
            return;
        }

        try {
            setCreating(true);

            console.log("Creating task for workspace:", id);

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND}/owner/createtask/${id}`,
                {
                    title: formData.title.trim(),
                    description: formData.description.trim(),
                    assignedTo: formData.assignedTo,
                    dueDate: formData.dueDate,
                },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(
                    "Task created and assigned successfully"
                );

                navigate(`/owner-workspace/${id}`);
            } else {
                toast.error(
                    res.data.message || "Unable to create task"
                );
            }
        } catch (error) {
            console.log("Create Task Error:", error);

            toast.error(
                error.response?.data?.message ||
                    "Unable to create task"
            );
        } finally {
            setCreating(false);
        }
    };
 
    if (loading) {
        return (
            <>
                <OwnerNavbar />

                <div className="min-h-screen bg-[#fafafa] px-5 py-10">
                    <div className="mx-auto max-w-4xl animate-pulse">
                        <div className="h-8 w-40 rounded-lg bg-black/10" />

                        <div className="mt-8 h-[500px] rounded-[28px] bg-black/5" />
                    </div>
                </div>

                <OwnerFooter />
            </>
        );
    }
 
    if (!workspace) {
        return (
            <>
                <OwnerNavbar />

                <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-5">
                    <div className="text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                            <ClipboardPlus size={24} />
                        </div>

                        <h1 className="mt-5 text-2xl font-bold">
                            Workspace not found
                        </h1>

                        <p className="mt-2 text-sm text-black/45">
                            The workspace you're trying to create a task
                            for could not be found.
                        </p>

                        <button
                            onClick={() => navigate("/owner-workspace")}
                            className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                        >
                            Back to Workspaces
                        </button>
                    </div>
                </div>

                <OwnerFooter />
            </>
        );
    }

    const members = workspace.members || [];

    return (
        <>
            <OwnerNavbar />

            <div className="min-h-screen bg-[#fafafa] text-black">
                <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-10">

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-7"
                    >
                        <button
                            type="button"
                            onClick={() => navigate(`/owner-workspace/${id}`)}
                            className="flex items-center gap-2 text-sm font-medium text-black/50 transition hover:text-black"
                        >
                            <ArrowLeft size={17} />

                            Back to Workspace
                        </button>

                        <div className="mt-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                                <ClipboardPlus size={22} />
                            </div>

                            <h1 className="mt-4 text-3xl font-bold tracking-tight">
                                Create Task
                            </h1>

                            <p className="mt-1 text-sm text-black/45">
                                Create and assign a task to a member of{" "}
                                <span className="font-semibold text-black/70">
                                    {workspace.title}
                                </span>
                            </p>
                        </div>
                    </motion.div>

                     
                    <motion.form
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="rounded-[28px] border border-black/10 bg-white p-6 shadow-sm sm:p-8"
                    >

                        
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/50">
                                Task Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                disabled={creating}
                                className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-black focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                            />
                        </div>

                        
                        <div className="mt-5">
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/50">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the task..."
                                rows={6}
                                disabled={creating}
                                className="w-full resize-none rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-black/25 focus:border-black focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                            />
                        </div>
 
                        <div className="mt-5 grid gap-5 sm:grid-cols-2">

                            
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/50">
                                    Assign To
                                </label>

                                <div className="relative">
                                    <User
                                        size={17}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                                    />

                                    <select
                                        name="assignedTo"
                                        value={formData.assignedTo}
                                        onChange={handleChange}
                                        disabled={
                                            creating ||
                                            members.length === 0
                                        }
                                        className="w-full appearance-none rounded-xl border border-black/10 bg-black/[0.02] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <option value="">
                                            Select member
                                        </option>

                                        {members.map((member) => (
                                            <option
                                                key={member._id}
                                                value={member._id}
                                            >
                                                {member.fullname}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {members.length === 0 && (
                                    <p className="mt-2 text-xs text-red-500">
                                        No members in this workspace.
                                    </p>
                                )}
                            </div>
 
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/50">
                                    Due Date
                                </label>

                                <div className="relative">
                                    <CalendarDays
                                        size={17}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                                    />

                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        disabled={creating}
                                        min={
                                            new Date(
                                                Date.now() +
                                                    24 * 60 * 60 * 1000
                                            )
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        className="w-full rounded-xl border border-black/10 bg-black/[0.02] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                                    />
                                </div>
                            </div>
                        </div>

                       
                        <div className="mt-6 rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                                Workspace
                            </p>

                            <p className="mt-1 text-sm font-semibold">
                                {workspace.title}
                            </p>

                            <p className="mt-1 text-xs text-black/40">
                                {members.length}{" "}
                                {members.length === 1
                                    ? "member"
                                    : "members"}{" "}
                                available for assignment
                            </p>
                        </div>

                        
                        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/owner-workspace/${id}`)
                                }
                                disabled={creating}
                                className="rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold text-black/60 transition hover:bg-black/5 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Cancel
                            </button>

                            
                            <button
                                type="submit"
                                disabled={
                                    creating ||
                                    members.length === 0
                                }
                                className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {creating ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <ClipboardPlus size={17} />

                                        Create Task
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.form>
                </main>
            </div>

            <OwnerFooter />
        </>
    );
};

export default CreateTask;