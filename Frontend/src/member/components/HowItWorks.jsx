import React from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardList,
    Rocket,
    UserPlus,
    Users,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Rocket,
        title: "Create a Workspace",
        description:
            "Create a dedicated workspace for your team, project, or department and keep everything organized in one place.",
    },
    {
        number: "02",
        icon: UserPlus,
        title: "Add Your Team",
        description:
            "Bring your team members into the workspace so everyone can access the work assigned to them.",
    },
    {
        number: "03",
        icon: ClipboardList,
        title: "Assign Tasks",
        description:
            "Create tasks, define the work, and assign each task to the right team member.",
    },
    {
        number: "04",
        icon: Users,
        title: "Track Progress",
        description:
            "Members update their progress while working, giving owners a clear view of the team's workload.",
    },
    {
        number: "05",
        icon: CheckCircle2,
        title: "Review & Complete",
        description:
            "Members submit their completed work with a link. Owners review the submission and approve the task.",
    },
];

const workflow = [
    {
        number: "01",
        title: "Task Assigned",
        description: "Owner assigned the task",
        status: "Assigned",
    },
    {
        number: "02",
        title: "Work In Progress",
        description: "Member is working on it",
        status: "In Progress",
    },
    {
        number: "03",
        title: "Work Submitted",
        description: "Completed work is ready",
        status: "Review",
    },
    {
        number: "04",
        title: "Task Approved",
        description: "Owner approved the work",
        status: "Completed",
    },
];

const HowItWorks = () => {
    return (
        <section className="relative overflow-hidden bg-white py-12 text-black sm:py-20 lg:py-28">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.025] blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-10 max-w-3xl text-center sm:mb-16 lg:mb-20"
                >
                    <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5">
                        <span className="h-px w-7 bg-black" />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 sm:text-xs">
                            Simple workflow
                        </span>

                        <span className="h-px w-7 bg-black" />
                    </div>

                    <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        From assignment
                        <br />
                        <span className="text-black/40">to completion.</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/50 sm:mt-6 sm:text-lg sm:leading-7">
                        One 5 Workspace turns your team's workflow into a simple,
                        transparent process where everyone knows what to do and what
                        happens next.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-[10%] right-[10%] top-[56px] hidden h-px bg-black/10 lg:block" />

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5 lg:gap-5">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        margin: "-50px",
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.08,
                                    }}
                                    className="group relative"
                                >
                                    <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-black/10 bg-white shadow-lg shadow-black/[0.04] transition-all duration-500 group-hover:border-black group-hover:shadow-xl sm:h-24 sm:w-24">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 group-hover:scale-110 sm:h-14 sm:w-14">
                                            <Icon size={20} className="sm:hidden" />
                                            <Icon size={23} className="hidden sm:block" />
                                        </div>

                                        <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-black text-[9px] font-bold text-white sm:h-8 sm:w-8 sm:text-[10px]">
                                            {step.number}
                                        </div>
                                    </div>

                                    <div className="mt-5 text-center sm:mt-7">
                                        <h3 className="text-base font-bold tracking-[-0.02em] sm:text-lg">
                                            {step.title}
                                        </h3>

                                        <p className="mt-2 text-xs leading-5 text-black/45 sm:mt-3 sm:text-sm sm:leading-6">
                                            {step.description}
                                        </p>
                                    </div>

                                    {index < steps.length - 1 && (
                                        <div className="absolute right-[-16px] top-[43px] z-20 hidden text-black/20 lg:block">
                                            <ArrowRight size={16} />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                    }}
                    className="mt-12 overflow-hidden rounded-[28px] bg-black text-white sm:mt-16 lg:mt-20"
                >
                    <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="p-6 sm:p-10 lg:p-14">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black sm:h-12 sm:w-12 sm:rounded-2xl">
                                <CheckCircle2 size={21} />
                            </div>

                            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 sm:text-xs">
                                Connected workflow
                            </p>

                            <h3 className="mt-3 max-w-lg text-2xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">
                                Every task has a clear path to completion.
                            </h3>

                            <p className="mt-4 max-w-xl text-sm leading-6 text-white/45 sm:mt-5 sm:text-base sm:leading-7">
                                No more guessing who is responsible for a task or whether
                                something has actually been completed. One 5 keeps the entire
                                workflow visible.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/50 sm:px-4 sm:py-2 sm:text-xs">
                                    Assigned
                                </span>

                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/50 sm:px-4 sm:py-2 sm:text-xs">
                                    Progress
                                </span>

                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/50 sm:px-4 sm:py-2 sm:text-xs">
                                    Review
                                </span>

                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/50 sm:px-4 sm:py-2 sm:text-xs">
                                    Complete
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                            <div className="relative">
                                <div className="absolute bottom-8 left-[19px] top-8 w-px bg-white/10 sm:left-[23px]" />

                                <div className="space-y-3 sm:space-y-4">
                                    {workflow.map((item, index) => (
                                        <motion.div
                                            key={item.number}
                                            initial={{
                                                opacity: 0,
                                                x: 20,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            viewport={{
                                                once: true,
                                            }}
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.4,
                                            }}
                                            className="relative flex items-center gap-3 sm:gap-4"
                                        >
                                            <div
                                                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold sm:h-12 sm:w-12 sm:text-xs ${index === workflow.length - 1
                                                    ? "bg-white text-black"
                                                    : "border border-white/10 bg-[#111] text-white"
                                                    }`}
                                            >
                                                {index === workflow.length - 1 ? (
                                                    <CheckCircle2 size={17} />
                                                ) : (
                                                    item.number
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:px-5 sm:py-4">
                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                                                    <div className="min-w-0">
                                                        <p className="truncate text-xs font-semibold sm:text-sm">
                                                            {item.title}
                                                        </p>

                                                        <p className="mt-1 truncate text-[10px] text-white/35 sm:text-xs">
                                                            {item.description}
                                                        </p>
                                                    </div>

                                                    <span
                                                        className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-[9px] font-medium sm:px-3 sm:text-[10px] ${index === workflow.length - 1
                                                            ? "bg-white text-black"
                                                            : "bg-white/[0.06] text-white/50"
                                                            }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;