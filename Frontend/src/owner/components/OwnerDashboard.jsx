import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileCheck2,
  FolderKanban,
  Home,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";

const OwnerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menu = [
    {
      name: "Overview",
      icon: Home,
      active: true,
    },
    {
      name: "Workspaces",
      icon: FolderKanban,
    },
    {
      name: "Tasks",
      icon: ClipboardCheck,
      count: 18,
    },
    {
      name: "Members",
      icon: Users,
    },
    {
      name: "Analytics",
      icon: BarChart3,
    },
  ];

  const stats = [
    {
      title: "Workspaces",
      value: "04",
      description: "Active workspaces",
      icon: FolderKanban,
      change: "+2 this month",
    },
    {
      title: "Members",
      value: "24",
      description: "Team members",
      icon: Users,
      change: "+6 this month",
    },
    {
      title: "Total Tasks",
      value: "128",
      description: "Tasks created",
      icon: ClipboardCheck,
      change: "+18 this week",
    },
    {
      title: "Completed",
      value: "86",
      description: "Tasks completed",
      icon: CheckCircle2,
      change: "67% completion",
    },
  ];

  const members = [
    {
      name: "Aarav Sharma",
      role: "Frontend Developer",
      tasks: 14,
      progress: 92,
      avatar: "AS",
    },
    {
      name: "Riya Mehta",
      role: "Backend Developer",
      tasks: 11,
      progress: 84,
      avatar: "RM",
    },
    {
      name: "Dev Kumar",
      role: "UI/UX Designer",
      tasks: 9,
      progress: 76,
      avatar: "DK",
    },
    {
      name: "Karan Singh",
      role: "Full Stack Developer",
      tasks: 12,
      progress: 68,
      avatar: "KS",
    },
  ];

  const tasks = [
    {
      title: "Redesign landing page",
      member: "Aarav Sharma",
      date: "Today",
      status: "Completed",
      type: "completed",
    },
    {
      title: "Integrate authentication API",
      member: "Riya Mehta",
      date: "Today",
      status: "In Review",
      type: "review",
    },
    {
      title: "Create mobile dashboard",
      member: "Dev Kumar",
      date: "Yesterday",
      status: "In Progress",
      type: "progress",
    },
    {
      title: "Database optimization",
      member: "Karan Singh",
      date: "Yesterday",
      status: "Completed",
      type: "completed",
    },
  ];

  const reviews = [
    {
      title: "Authentication system",
      member: "Riya Mehta",
      submitted: "12 min ago",
      type: "Development",
    },
    {
      title: "Homepage UI design",
      member: "Dev Kumar",
      submitted: "34 min ago",
      type: "Design",
    },
    {
      title: "Product API integration",
      member: "Karan Singh",
      submitted: "1 hr ago",
      type: "Development",
    },
  ];

  const taskStats = [
    {
      title: "All Tasks",
      value: 128,
      icon: ClipboardCheck,
    },
    {
      title: "In Progress",
      value: 24,
      icon: Clock3,
    },
    {
      title: "In Review",
      value: 18,
      icon: FileCheck2,
    },
    {
      title: "Completed",
      value: 86,
      icon: CheckCircle2,
    },
  ];

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-[72px] items-center justify-between border-b border-black/10 px-5">
        <div>
          <h1 className="text-xl font-black tracking-[-0.06em]">
            ONE 5
          </h1>

          <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-black/35">
            Workspace
          </p>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 lg:hidden"
        >
          <X size={17} />
        </button>
      </div>

      <div className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-black/30">
          Workspace
        </p>

        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold transition ${
                  item.active
                    ? "bg-black text-white shadow-lg shadow-black/10"
                    : "text-black/50 hover:bg-black/[0.04] hover:text-black"
                }`}
              >
                <Icon size={17} />

                <span>{item.name}</span>

                {item.count && (
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 text-[9px] ${
                      item.active
                        ? "bg-white/15 text-white"
                        : "bg-black/[0.05] text-black/45"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <p className="mb-3 mt-8 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-black/30">
          Account
        </p>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-black/50 transition hover:bg-black/[0.04] hover:text-black">
          <Settings size={17} />
          Settings
        </button>
      </div>

      <div className="border-t border-black/10 p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-black/[0.03] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
            YN
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-bold">
              Yomesh Nagar
            </p>

            <p className="mt-0.5 text-[9px] text-black/35">
              Owner
            </p>
          </div>
        </div>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-black/50 transition hover:bg-black/[0.04] hover:text-black">
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-black/10 bg-white lg:block">
        {sidebar}
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white lg:hidden"
            >
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-black/10 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 lg:hidden"
            >
              <Menu size={18} />
            </button>

            <div className="hidden items-center gap-3 sm:flex">
              <span className="text-xs font-medium text-black/35">
                Workspace
              </span>

              <span className="text-black/20">/</span>

              <span className="text-xs font-semibold">
                Overview
              </span>
            </div>

            <div className="sm:hidden">
              <p className="text-sm font-bold">Overview</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden md:block">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
              />

              <input
                type="text"
                placeholder="Search..."
                className="h-10 w-52 rounded-xl border border-black/10 bg-black/[0.02] pl-9 pr-3 text-xs outline-none transition focus:border-black/30"
              />
            </div>

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/10">
              <Bell size={17} />

              <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-black" />
            </button>

            <button className="hidden items-center gap-2 rounded-xl border border-black/10 px-2 py-1.5 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                YN
              </div>

              <ChevronDown
                size={14}
                className="text-black/40"
              />
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1500px]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                  Saturday, August 15
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                  Good morning, Yomesh.
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
                  Here is everything happening across your workspace today.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-xs font-semibold transition hover:border-black">
                  <Users size={15} />
                  Invite Member
                </button>

                <button className="flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-xs font-semibold text-white transition hover:-translate-y-0.5">
                  <Plus size={15} />
                  New Workspace
                </button>
              </div>
            </motion.div>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    className="group rounded-2xl border border-black/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                        <Icon size={18} />
                      </div>

                      <ArrowRight
                        size={16}
                        className="text-black/20 transition group-hover:translate-x-1 group-hover:text-black"
                      />
                    </div>

                    <p className="mt-7 text-xs font-medium text-black/40">
                      {stat.title}
                    </p>

                    <h2 className="mt-1 text-3xl font-bold">
                      {stat.value}
                    </h2>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <p className="text-[10px] text-black/35">
                        {stat.description}
                      </p>

                      <span className="rounded-full bg-black/[0.05] px-2 py-1 text-[9px] font-semibold">
                        {stat.change}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </section>

            <section className="mt-8">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                    Active Workspace
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                    One 5 Workspace
                  </h2>
                </div>

                <button className="flex w-fit items-center gap-2 text-xs font-semibold hover:gap-3">
                  View workspace
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-black px-3 py-1.5 text-[9px] font-bold text-white">
                        ACTIVE
                      </span>

                      <span className="text-[10px] text-black/35">
                        Updated a few minutes ago
                      </span>
                    </div>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-black/45">
                      A central place for your team to collaborate,
                      manage tasks, monitor progress and deliver work
                      efficiently.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 rounded-xl border border-black/10 px-4 py-3">
                        <Users size={15} />
                        <span className="text-xs font-medium">
                          12 Members
                        </span>
                      </div>

                      <div className="flex items-center gap-2 rounded-xl border border-black/10 px-4 py-3">
                        <CalendarDays size={15} />
                        <span className="text-xs font-medium">
                          Created Aug 2026
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black p-6 text-white sm:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/40">
                          Overall progress
                        </p>

                        <p className="mt-2 text-4xl font-bold">
                          78%
                        </p>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15">
                        <Zap size={20} />
                      </div>
                    </div>

                    <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{
                          duration: 1,
                          delay: 0.5,
                        }}
                        className="h-full rounded-full bg-white"
                      />
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 p-4">
                        <CheckCircle2 size={16} />

                        <p className="mt-4 text-xl font-bold">
                          86
                        </p>

                        <p className="mt-1 text-[9px] text-white/40">
                          Completed
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 p-4">
                        <Clock3 size={16} />

                        <p className="mt-4 text-xl font-bold">
                          42
                        </p>

                        <p className="mt-1 text-[9px] text-white/40">
                          Remaining
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                    Task Management
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                    Task overview
                  </h2>
                </div>

                <button className="hidden items-center gap-2 text-xs font-semibold sm:flex">
                  Manage tasks
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {taskStats.map((task, index) => {
                  const Icon = task.icon;

                  return (
                    <motion.div
                      key={task.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.06,
                      }}
                      className={`rounded-2xl border p-5 ${
                        index === 0
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-white"
                      }`}
                    >
                      <Icon size={18} />

                      <p
                        className={`mt-7 text-xs ${
                          index === 0
                            ? "text-white/45"
                            : "text-black/40"
                        }`}
                      >
                        {task.title}
                      </p>

                      <h3 className="mt-1 text-3xl font-bold">
                        {task.value}
                      </h3>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                      Your Team
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">
                      Team activity
                    </h2>
                  </div>

                  <button className="flex items-center gap-2 text-xs font-semibold">
                    Manage
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
                  <div className="flex items-center justify-between border-b border-black/10 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                        <Users size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-bold">
                          Workspace members
                        </p>

                        <p className="mt-0.5 text-[10px] text-black/35">
                          12 members currently active
                        </p>
                      </div>
                    </div>

                    <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
                      <UserPlus size={15} />
                    </button>
                  </div>

                  <div className="divide-y divide-black/10">
                    {members.map((member, index) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.05,
                        }}
                        className="flex items-center gap-4 p-5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                          {member.avatar}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold">
                            {member.name}
                          </p>

                          <p className="mt-1 truncate text-[9px] text-black/35">
                            {member.role}
                          </p>
                        </div>

                        <div className="hidden w-24 sm:block">
                          <div className="flex justify-between">
                            <span className="text-[9px] text-black/35">
                              Progress
                            </span>

                            <span className="text-[9px] font-bold">
                              {member.progress}%
                            </span>
                          </div>

                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                            <div
                              className="h-full rounded-full bg-black"
                              style={{
                                width: `${member.progress}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="hidden text-right sm:block">
                          <p className="text-[9px] text-black/35">
                            Tasks
                          </p>

                          <p className="mt-1 text-xs font-bold">
                            {member.tasks}
                          </p>
                        </div>

                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10">
                          <MoreHorizontal size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                      Needs Attention
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">
                      Pending reviews
                    </h2>
                  </div>

                  <span className="rounded-full bg-black px-2.5 py-1 text-[9px] font-bold text-white">
                    03
                  </span>
                </div>

                <div className="space-y-3">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.07,
                      }}
                      className="rounded-2xl border border-black/10 bg-white p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                          <FileCheck2 size={15} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold">
                            {review.title}
                          </p>

                          <p className="mt-1 text-[9px] text-black/40">
                            {review.member}
                          </p>
                        </div>

                        <span className="rounded-full bg-black/[0.05] px-2 py-1 text-[8px] font-semibold">
                          {review.type}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-[9px] text-black/35">
                          Submitted {review.submitted}
                        </p>

                        <button className="flex items-center gap-1.5 text-[9px] font-bold">
                          Review
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white py-3 text-xs font-semibold transition hover:border-black">
                  View all reviews
                  <ArrowRight size={14} />
                </button>
              </div>
            </section>

            <section className="mt-8">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                    Activity
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">
                    Recent tasks
                  </h2>
                </div>

                <button className="flex items-center gap-2 text-xs font-semibold">
                  View all
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
                <div className="divide-y divide-black/10">
                  {tasks.map((task, index) => {
                    const Icon =
                      task.type === "completed"
                        ? CheckCircle2
                        : task.type === "review"
                        ? FileCheck2
                        : Clock3;

                    return (
                      <motion.div
                        key={task.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.06,
                        }}
                        className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            task.type === "completed"
                              ? "bg-black text-white"
                              : "border border-black/10"
                          }`}
                        >
                          <Icon size={16} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold">
                            {task.title}
                          </p>

                          <div className="mt-1 flex gap-2 text-[9px] text-black/35">
                            <span>{task.member}</span>
                            <span>•</span>
                            <span>{task.date}</span>
                          </div>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1.5 text-[9px] font-semibold ${
                            task.type === "completed"
                              ? "bg-black text-white"
                              : "bg-black/[0.05]"
                          }`}
                        >
                          {task.status}
                        </span>

                        <button className="hidden h-9 w-9 items-center justify-center rounded-lg border border-black/10 sm:flex">
                          <ArrowRight size={14} />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="mt-8 overflow-hidden rounded-[28px] bg-black p-6 text-white sm:p-10 lg:p-12">
              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                    <Zap size={18} />
                  </div>

                  <h2 className="text-3xl font-bold tracking-[-0.05em] sm:text-4xl">
                    Keep your team moving.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
                    Create a new workspace, bring your team together and
                    start assigning meaningful work.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-bold text-black">
                    <Plus size={15} />
                    Create Workspace
                  </button>

                  <button className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-xs font-bold text-white">
                    <UserPlus size={15} />
                    Invite Member
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;