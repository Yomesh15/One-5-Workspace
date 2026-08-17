import React from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    Clock3,
    FileCheck2,
    Play,
} from "lucide-react";

const stages = [
    {
        number: "01",
        title: "Assigned",
        description:
            "The owner assigns a task to a specific team member.",
        icon: FileCheck2,
    },
    {
        number: "02",
        title: "In Progress",
        description:
            "The member starts working and updates the task progress.",
        icon: Play,
    },
    {
        number: "03",
        title: "Completed",
        description:
            "The member finishes the assigned work.",
        icon: Check,
    },
    {
        number: "04",
        title: "Under Review",
        description:
            "Completed work is submitted with the required link.",
        icon: Clock3,
    },
    {
        number: "05",
        title: "Approved",
        description:
            "The owner reviews and approves the completed task.",
        icon: CheckCircle2,
    },
];

const TaskLifecycle = () => {
    return (
        <section className="relative overflow-hidden bg-[#fafafa] py-12 text-black sm:py-18 lg:py-11">

            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[500px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.025] blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="mx-auto max-w-3xl text-center"
                >

                    <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5">
                        <span className="h-px w-7 bg-black" />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 sm:text-xs">
                            Task lifecycle
                        </span>

                        <span className="h-px w-7 bg-black" />
                    </div>

                    <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        Every task has
                        <br />
                        <span className="text-black/40">
                            a clear destination.
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/50 sm:mt-6 sm:text-lg sm:leading-7">
                        From the moment work is assigned until it is approved,
                        One 5 Workspace keeps every stage visible and organized.
                    </p>

                </motion.div>


                <div className="mt-10 sm:mt-16 lg:mt-20">

                    <div className="relative hidden lg:block">

                        <div className="absolute left-[10%] right-[10%] top-[68px] h-px bg-black/10" />

                        <div className="grid grid-cols-5 gap-5">

                            {stages.map((stage, index) => {

                                const Icon = stage.icon;

                                return (
                                    <motion.div
                                        key={stage.number}
                                        initial={{
                                            opacity: 0,
                                            y: 25,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.08,
                                        }}
                                        className="group relative text-center"
                                    >

                                        <div className="relative z-10 mx-auto flex h-[136px] w-[136px] items-center justify-center rounded-full border border-black/10 bg-white shadow-xl shadow-black/[0.04] transition-all duration-500 group-hover:border-black group-hover:shadow-2xl">

                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 group-hover:scale-110">
                                                <Icon size={28} />
                                            </div>

                                            <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-black text-[9px] font-bold text-white">
                                                {stage.number}
                                            </div>

                                        </div>

                                        <h3 className="mt-7 text-lg font-bold">
                                            {stage.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-black/45">
                                            {stage.description}
                                        </p>

                                        {index < stages.length - 1 && (
                                            <ArrowRight
                                                size={18}
                                                className="absolute -right-5 top-[60px] text-black/20"
                                            />
                                        )}

                                    </motion.div>
                                );
                            })}

                        </div>

                    </div>


                    <div className="space-y-3 lg:hidden">

                        {stages.map((stage, index) => {

                            const Icon = stage.icon;

                            return (
                                <motion.div
                                    key={stage.number}
                                    initial={{
                                        opacity: 0,
                                        x: -20,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.45,
                                        delay: index * 0.06,
                                    }}
                                    className="flex gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
                                >

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                                        <Icon size={18} />
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold text-black/30">
                                                {stage.number}
                                            </span>

                                            <h3 className="text-sm font-bold">
                                                {stage.title}
                                            </h3>
                                        </div>

                                        <p className="mt-1.5 text-xs leading-5 text-black/45">
                                            {stage.description}
                                        </p>

                                    </div>

                                </motion.div>
                            );
                        })}

                    </div>

                </div>


                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        delay: 0.2,
                    }}
                    className="mt-10 overflow-hidden rounded-[26px] bg-black text-white sm:mt-16 lg:mt-20"
                >

                    <div className="grid lg:grid-cols-2">

                        <div className="p-6 sm:p-10 lg:p-14">

                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 sm:text-xs">
                                No work gets lost
                            </p>

                            <h3 className="mt-3 max-w-lg text-2xl font-bold leading-tight tracking-[-0.03em] sm:mt-5 sm:text-4xl">
                                Know exactly where every task stands.
                            </h3>

                            <p className="mt-4 max-w-xl text-sm leading-6 text-white/50 sm:mt-5 sm:text-base sm:leading-7">
                                Owners get visibility across the workspace while
                                members always know what they need to work on next.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">

                                <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/60 sm:px-4 sm:py-2 sm:text-xs">
                                    Clear ownership
                                </span>

                                <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/60 sm:px-4 sm:py-2 sm:text-xs">
                                    Real-time progress
                                </span>

                                <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/60 sm:px-4 sm:py-2 sm:text-xs">
                                    Simple reviews
                                </span>

                            </div>

                        </div>


                        <div className="border-t border-white/10 bg-white/[0.025] p-5 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">

                            <div className="space-y-2.5 sm:space-y-3">

                                {[
                                    ["Task assigned", "Yomesh", "100%"],
                                    ["Working on task", "Yomesh", "70%"],
                                    ["Work submitted", "Yomesh", "90%"],
                                    ["Task approved", "Owner", "100%"],
                                ].map(([title, person, progress], index) => (

                                    <motion.div
                                        key={title}
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
                                        }}
                                        className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5 sm:rounded-2xl sm:p-4"
                                    >

                                        <div className="flex items-center justify-between gap-3">

                                            <div className="min-w-0">
                                                <p className="truncate text-xs font-semibold sm:text-sm">
                                                    {title}
                                                </p>

                                                <p className="mt-1 text-[10px] text-white/35 sm:text-xs">
                                                    {person}
                                                </p>
                                            </div>

                                            <span className="shrink-0 text-[10px] text-white/50 sm:text-xs">
                                                {progress}
                                            </span>

                                        </div>

                                        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">

                                            <motion.div
                                                initial={{
                                                    width: 0,
                                                }}
                                                whileInView={{
                                                    width: progress,
                                                }}
                                                viewport={{
                                                    once: true,
                                                }}
                                                transition={{
                                                    duration: 0.9,
                                                    delay: 0.2 + index * 0.1,
                                                }}
                                                className="h-full rounded-full bg-white"
                                            />

                                        </div>

                                    </motion.div>

                                ))}

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
};

export default TaskLifecycle;