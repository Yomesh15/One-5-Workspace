import React from "react";
import { motion } from "framer-motion";
import {
    Bell,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Clock3,
    LayoutDashboard,
    ListTodo,
    MoreHorizontal,
    Plus,
    Search,
    Settings,
    Users,
} from "lucide-react";

const DashboardPreview = () => {
    return (
        <section className="relative overflow-hidden bg-white py-24 text-black sm:py-32">


            <div className="pointer-events-none absolute left-1/2 top-20 -z-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-black/[0.025] blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <div className="mb-5 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-black" />

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                            Your workspace
                        </span>

                        <span className="h-px w-8 bg-black" />
                    </div>

                    <h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        Everything happening
                        <br />
                        <span className="text-black/40">
                            in one place.
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/50 sm:text-lg">
                        See your team's tasks, progress, members, and workspace activity
                        from a single clean dashboard.
                    </p>
                </motion.div>


                <motion.div
                    initial={{
                        opacity: 0,
                        y: 60,
                        scale: 0.97,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                    className="relative mt-16"
                >


                    <div className="absolute -inset-10 -z-10 rounded-[50px] bg-black/[0.04] blur-3xl" />


                    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-2xl shadow-black/[0.08]">


                        <div className="flex h-12 items-center border-b border-black/10 bg-[#fafafa] px-5">


                            <div className="flex gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                            </div>


                            <div className="mx-auto hidden rounded-lg bg-white px-5 py-1.5 text-[10px] text-black/30 shadow-sm sm:block">
                                app.one5workspace.com/dashboard
                            </div>

                            <div className="w-14" />
                        </div>


                        <div className="flex min-h-[620px]">


                            <aside className="hidden w-56 shrink-0 border-r border-black/10 bg-[#fafafa] p-4 md:block">


                                <div className="flex items-center gap-2 px-2 py-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-xs font-bold text-white">
                                        5
                                    </div>

                                    <span className="text-sm font-bold">
                                        One 5
                                    </span>
                                </div>


                                <div className="mt-5 rounded-xl border border-black/10 bg-white p-3">
                                    <p className="text-[9px] uppercase tracking-wider text-black/30">
                                        Workspace
                                    </p>

                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-xs font-semibold">
                                            Development
                                        </span>

                                        <ChevronDown size={13} className="text-black/30" />
                                    </div>
                                </div>


                                <div className="mt-7 space-y-1">

                                    <SidebarItem
                                        icon={LayoutDashboard}
                                        label="Overview"
                                        active
                                    />

                                    <SidebarItem
                                        icon={ListTodo}
                                        label="My Tasks"
                                    />

                                    <SidebarItem
                                        icon={Users}
                                        label="Team"
                                    />

                                    <SidebarItem
                                        icon={CalendarDays}
                                        label="Calendar"
                                    />

                                    <SidebarItem
                                        icon={Settings}
                                        label="Settings"
                                    />

                                </div>

                            </aside>


                            <main className="min-w-0 flex-1">


                                <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 sm:px-7">

                                    <div>
                                        <p className="text-xs text-black/35">
                                            Friday, August 14
                                        </p>

                                        <h3 className="mt-1 text-lg font-bold">
                                            Good evening, Yomesh
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-2">

                                        <button className="hidden h-9 items-center gap-2 rounded-lg border border-black/10 px-3 text-xs text-black/50 sm:flex">
                                            <Search size={14} />
                                            Search
                                        </button>

                                        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10">
                                            <Bell size={15} />
                                        </button>

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                                            Y
                                        </div>

                                    </div>
                                </div>


                                <div className="p-5 sm:p-7">


                                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

                                        <MiniStat
                                            label="Total Tasks"
                                            value="24"
                                            icon={ListTodo}
                                        />

                                        <MiniStat
                                            label="In Progress"
                                            value="08"
                                            icon={Clock3}
                                        />

                                        <MiniStat
                                            label="Completed"
                                            value="12"
                                            icon={CheckCircle2}
                                        />

                                        <MiniStat
                                            label="Team Members"
                                            value="06"
                                            icon={Users}
                                        />

                                    </div>


                                    <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">


                                        <div className="rounded-2xl border border-black/10 bg-white">

                                            <div className="flex items-center justify-between border-b border-black/10 p-5">

                                                <div>
                                                    <h4 className="text-sm font-bold">
                                                        Recent Tasks
                                                    </h4>

                                                    <p className="mt-1 text-[10px] text-black/35">
                                                        Keep track of your team's work
                                                    </p>
                                                </div>

                                                <button className="flex items-center gap-1.5 rounded-lg bg-black px-3 py-2 text-[10px] font-semibold text-white">
                                                    <Plus size={13} />
                                                    Add Task
                                                </button>

                                            </div>

                                            <div className="divide-y divide-black/10">

                                                <DashboardTask
                                                    title="Build authentication system"
                                                    member="Yomesh"
                                                    progress={85}
                                                    status="In Progress"
                                                />

                                                <DashboardTask
                                                    title="Design workspace dashboard"
                                                    member="Aman"
                                                    progress={65}
                                                    status="In Progress"
                                                />

                                                <DashboardTask
                                                    title="Create member API"
                                                    member="Rahul"
                                                    progress={100}
                                                    status="Completed"
                                                />

                                                <DashboardTask
                                                    title="Deploy production build"
                                                    member="Yomesh"
                                                    progress={45}
                                                    status="In Progress"
                                                />

                                            </div>
                                        </div>


                                        <div className="rounded-2xl border border-black/10 bg-white">

                                            <div className="flex items-center justify-between border-b border-black/10 p-5">

                                                <div>
                                                    <h4 className="text-sm font-bold">
                                                        Team
                                                    </h4>

                                                    <p className="mt-1 text-[10px] text-black/35">
                                                        Active members
                                                    </p>
                                                </div>

                                                <Users size={16} className="text-black/30" />

                                            </div>

                                            <div className="space-y-4 p-5">

                                                <TeamMember
                                                    name="Yomesh Nagar"
                                                    role="Owner"
                                                    tasks="8 tasks"
                                                    initial="Y"
                                                />

                                                <TeamMember
                                                    name="Aman Sharma"
                                                    role="Member"
                                                    tasks="6 tasks"
                                                    initial="A"
                                                />

                                                <TeamMember
                                                    name="Rahul Kumar"
                                                    role="Member"
                                                    tasks="5 tasks"
                                                    initial="R"
                                                />

                                                <TeamMember
                                                    name="Priya Singh"
                                                    role="Member"
                                                    tasks="5 tasks"
                                                    initial="P"
                                                />

                                            </div>

                                        </div>

                                    </div>


                                    <div className="mt-5 rounded-2xl border border-black/10 bg-[#fafafa] p-5">

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-bold">
                                                    Recent Activity
                                                </h4>

                                                <p className="mt-1 text-[10px] text-black/35">
                                                    Latest workspace updates
                                                </p>
                                            </div>

                                            <button className="text-[10px] font-semibold text-black/40 hover:text-black">
                                                View all
                                            </button>
                                        </div>

                                        <div className="mt-5 grid gap-3 sm:grid-cols-3">

                                            <Activity
                                                text="Rahul completed a task"
                                                time="2 min ago"
                                            />

                                            <Activity
                                                text="Aman updated progress"
                                                time="15 min ago"
                                            />

                                            <Activity
                                                text="New task assigned"
                                                time="32 min ago"
                                            />

                                        </div>

                                    </div>

                                </div>

                            </main>
                        </div>
                    </div>


                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-7 -left-4 hidden rounded-2xl border border-black/10 bg-white p-4 shadow-2xl sm:block lg:-left-8"
                    >
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                                <CheckCircle2 size={19} />
                            </div>

                            <div>
                                <p className="text-xs font-bold">
                                    Task completed
                                </p>

                                <p className="mt-0.5 text-[10px] text-black/40">
                                    Review is ready
                                </p>
                            </div>

                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="absolute -right-4 -top-5 hidden rounded-2xl border border-black/10 bg-white p-4 shadow-2xl lg:-right-8 lg:block"
                    >
                        <div className="flex items-center gap-3">

                            <div className="flex -space-x-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black text-[10px] text-white">
                                    Y
                                </div>

                                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/70 text-[10px] text-white">
                                    A
                                </div>

                                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/40 text-[10px] text-white">
                                    R
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-bold">
                                    Team is active
                                </p>

                                <p className="mt-0.5 text-[10px] text-black/40">
                                    3 members working
                                </p>
                            </div>

                        </div>
                    </motion.div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <p className="text-sm text-black/40">
                        Designed to keep your team's work clear, organized, and visible.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};


const SidebarItem = ({ icon: Icon, label, active }) => {
    return (
        <div
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition ${active
                ? "bg-black text-white"
                : "text-black/40 hover:bg-black/[0.04] hover:text-black"
                }`}
        >
            <Icon size={15} />
            {label}
        </div>
    );
};


const MiniStat = ({ label, value, icon: Icon }) => {
    return (
        <div className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="flex items-center justify-between">
                <span className="text-[10px] text-black/40">
                    {label}
                </span>

                <Icon size={14} className="text-black/30" />
            </div>

            <p className="mt-3 text-2xl font-bold tracking-[-0.03em]">
                {value}
            </p>
        </div>
    );
};


const DashboardTask = ({
    title,
    member,
    progress,
    status,
}) => {
    return (
        <motion.div
            whileHover={{ backgroundColor: "rgba(0,0,0,0.015)" }}
            className="p-5 transition"
        >
            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-black" />

                        <h5 className="truncate text-xs font-semibold">
                            {title}
                        </h5>
                    </div>

                    <p className="mt-1.5 text-[10px] text-black/35">
                        Assigned to {member}
                    </p>
                </div>

                <button className="shrink-0 text-black/30">
                    <MoreHorizontal size={15} />
                </button>

            </div>

            <div className="mt-4">

                <div className="mb-1.5 flex justify-between text-[9px] text-black/35">
                    <span>{status}</span>
                    <span>{progress}%</span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                        }}
                        className="h-full rounded-full bg-black"
                    />
                </div>

            </div>
        </motion.div>
    );
};


const TeamMember = ({
    name,
    role,
    tasks,
    initial,
}) => {
    return (
        <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                {initial}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">
                    {name}
                </p>

                <p className="mt-0.5 text-[9px] text-black/35">
                    {role} · {tasks}
                </p>
            </div>

            <span className="h-2 w-2 rounded-full bg-black" />

        </div>
    );
};



const Activity = ({
    text,
    time,
}) => {

    return (
        <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-white">
                <CheckCircle2 size={14} />
            </div>

            <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold">
                    {text}
                </p>

                <p className="mt-0.5 text-[9px] text-black/35">
                    {time}
                </p>
            </div>

        </div>
    );
};

export default DashboardPreview;