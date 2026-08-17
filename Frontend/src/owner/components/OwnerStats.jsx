import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    CheckCircle2,
    ClipboardList,
    Users,
    FolderKanban,
} from "lucide-react";
import axios from "axios";

const OwnerStats = () => {
    const [stats, setStats] = useState({
        workspaces: 0,
        members: 0,
        tasks: 0,
        completed: 0,
    });

    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            setLoading(true);

            const [workspaceRes, memberRes, taskRes] = await Promise.all([
                axios.get(
                    `${import.meta.env.VITE_BACKEND}/owner/allworkspaces`,
                    { withCredentials: true }
                ),

                axios.get(
                    `${import.meta.env.VITE_BACKEND}/owner/team`,
                    { withCredentials: true }
                ),

                axios.get(
                    `${import.meta.env.VITE_BACKEND}/owner/gettasks`,
                    { withCredentials: true }
                ),
            ]);

            const workspaces = workspaceRes.data?.workspaces || workspaceRes.data || [];
            const members = memberRes.data?.members || memberRes.data || [];
            const tasks = taskRes.data?.tasks || taskRes.data || [];

            const completedTasks = tasks.filter(
                (task) =>
                    task.status?.toLowerCase() === "completed" ||
                    task.status?.toLowerCase() === "complete"
            ).length;

            setStats({
                workspaces: workspaces.length,
                members: members.length,
                tasks: tasks.length,
                completed: completedTasks,
            });

        } catch (error) {
            console.error("Error fetching owner stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const completionPercentage =
        stats.tasks > 0
            ? Math.round((stats.completed / stats.tasks) * 100)
            : 0;

    const statsData = [
        {
            title: "Workspaces",
            value: stats.workspaces,
            description: "Active workspaces",
            icon: FolderKanban,
            change: `${stats.workspaces} total`,
        },
        {
            title: "Members",
            value: stats.members,
            description: "Team members",
            icon: Users,
            change: `${stats.members} members`,
        },
        {
            title: "Total Tasks",
            value: stats.tasks,
            description: "Tasks created",
            icon: ClipboardList,
            change: `${stats.tasks} total`,
        },
        {
            title: "Completed",
            value: stats.completed,
            description: "Tasks completed",
            icon: CheckCircle2,
            change: `${completionPercentage}% completion`,
        },
    ];

    return (
        <section className="bg-white px-5 py-16 text-black sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                            Workspace Overview
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                            Everything at a glance.
                        </h2>
                    </div>

                    <p className="max-w-md text-sm leading-6 text-black/45">
                        Keep track of your teams, tasks and workspace activity from one
                        simple overview.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {statsData.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                }}
                                className="group rounded-2xl border border-black/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]"
                            >
                                <div className="flex items-start justify-between">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                                        <Icon size={18} />
                                    </div>

                                    <ArrowUpRight
                                        size={17}
                                        className="text-black/25 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black"
                                    />

                                </div>

                                <div className="mt-7">

                                    <p className="text-xs font-medium text-black/40">
                                        {stat.title}
                                    </p>

                                    <div className="mt-1 flex items-end gap-3">

                                        <h3 className="text-3xl font-bold tracking-tight">
                                            {loading ? "—" : stat.value}
                                        </h3>

                                    </div>

                                    <div className="mt-3 flex items-center justify-between gap-2">

                                        <p className="text-[11px] text-black/40">
                                            {stat.description}
                                        </p>

                                        <span className="rounded-full bg-black/[0.05] px-2 py-1 text-[9px] font-semibold">
                                            {loading ? "Loading..." : stat.change}
                                        </span>

                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};

export default OwnerStats;