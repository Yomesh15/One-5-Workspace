import React from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Check,
    MessageCircle,
    Search,
    Sparkles,
    Target,
    Workflow,
    X,
} from "lucide-react";

const benefits = [
    {
        icon: Target,
        title: "Clear ownership",
        description:
            "Every task has a person responsible for getting it done.",
    },
    {
        icon: Workflow,
        title: "Simple workflow",
        description:
            "Move from assignment to approval without complicated processes.",
    },
    {
        icon: Search,
        title: "Complete visibility",
        description:
            "See what your team is working on and where every task stands.",
    },
    {
        icon: MessageCircle,
        title: "Less confusion",
        description:
            "Keep tasks, progress, submissions, and reviews connected.",
    },
];

const WhyOne5 = () => {
    return (
        <section className="relative overflow-hidden bg-white pt-12 pb-14 text-black sm:pt-16 sm:pb-20 lg:py-24">

            <div className="pointer-events-none absolute right-0 top-1/2 -z-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-black/[0.025] blur-3xl sm:h-[500px] sm:w-[500px]" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="grid items-end gap-6 lg:grid-cols-2 lg:gap-8"
                >

                    <div>
                        <div className="mb-4 flex items-center gap-3 sm:mb-5">
                            <span className="h-px w-7 bg-black sm:w-8" />

                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 sm:text-xs">
                                Why One 5
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                            Stop managing work
                            <br />
                            <span className="text-black/40">
                                in scattered places.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-xl text-sm leading-6 text-black/50 sm:text-base sm:leading-7 lg:justify-self-end lg:text-lg">
                        One 5 Workspace brings your team, tasks, progress, and reviews
                        together so your team can spend less time managing work and more
                        time actually doing it.
                    </p>

                </motion.div>

                <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-2">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="overflow-hidden rounded-[24px] border border-black/10 bg-[#fafafa] sm:rounded-[30px]"
                    >

                        <div className="border-b border-black/10 p-5 sm:p-9">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white sm:h-11 sm:w-11">
                                    <X size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-bold">
                                        Without One 5 Workspace
                                    </p>

                                    <p className="mt-1 text-xs text-black/35">
                                        The usual way of working
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="space-y-2.5 p-5 sm:space-y-3 sm:p-9">

                            {[
                                "Tasks scattered across chats",
                                "Nobody knows who owns the work",
                                "Manual progress updates",
                                "Completed work gets lost",
                                "No clear review process",
                                "Too many tools for one workflow",
                            ].map((item, index) => (

                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06 }}
                                    className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3.5 sm:p-4"
                                >

                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/[0.05] text-black/40">
                                        <X size={13} />
                                    </div>

                                    <span className="text-xs leading-5 text-black/55 sm:text-sm">
                                        {item}
                                    </span>

                                </motion.div>

                            ))}

                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="overflow-hidden rounded-[24px] bg-black text-white sm:rounded-[30px]"
                    >

                        <div className="border-b border-white/10 p-5 sm:p-9">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black sm:h-11 sm:w-11">
                                    <Check size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-bold">
                                        With One 5 Workspace
                                    </p>

                                    <p className="mt-1 text-xs text-white/35">
                                        A better way to work
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="space-y-2.5 p-5 sm:space-y-3 sm:p-9">

                            {[
                                "Everything organized in workspaces",
                                "Every task has a clear owner",
                                "Progress visible to the team",
                                "Work attached directly to tasks",
                                "Built-in submission and review",
                                "One simple connected workflow",
                            ].map((item, index) => (

                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06 }}
                                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3.5 sm:p-4"
                                >

                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black">
                                        <Check size={13} />
                                    </div>

                                    <span className="text-xs leading-5 text-white/70 sm:text-sm">
                                        {item}
                                    </span>

                                </motion.div>

                            ))}

                        </div>

                    </motion.div>

                </div>

                <div className="mt-12 sm:mt-16">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-5 sm:mb-8"
                    >

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
                                <Sparkles size={16} />
                            </div>

                            <p className="text-sm font-semibold">
                                Why teams choose a connected workspace
                            </p>

                        </div>

                    </motion.div>

                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">

                        {benefits.map((benefit, index) => {

                            const Icon = benefit.icon;

                            return (
                                <motion.div
                                    key={benefit.title}
                                    initial={{
                                        opacity: 0,
                                        y: 20,
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
                                        delay: index * 0.07,
                                    }}
                                    whileHover={{
                                        y: -4,
                                    }}
                                    className="group rounded-2xl border border-black/10 bg-white p-5 transition-all duration-300 hover:border-black/20 hover:shadow-xl hover:shadow-black/[0.05] sm:p-6"
                                >

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-transform duration-300 group-hover:scale-110">
                                        <Icon size={18} />
                                    </div>

                                    <h3 className="mt-5 text-base font-bold">
                                        {benefit.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-black/45">
                                        {benefit.description}
                                    </p>

                                </motion.div>
                            );

                        })}

                    </div>

                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.98,
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="mt-10 rounded-[24px] border border-black/10 bg-[#fafafa] p-5 sm:mt-14 sm:rounded-[30px] sm:p-8 lg:p-10"
                >

                    <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center sm:gap-6">

                        <div className="flex items-start gap-3 sm:gap-4">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                                <Target size={19} />
                            </div>

                            <div>

                                <h3 className="text-lg font-bold tracking-[-0.02em] sm:text-xl">
                                    One place for the entire work cycle.
                                </h3>

                                <p className="mt-1.5 max-w-2xl text-xs leading-5 text-black/45 sm:mt-2 sm:text-sm sm:leading-6">
                                    Assign work, follow progress, collect completed work,
                                    and review everything without switching between
                                    different platforms.
                                </p>

                            </div>

                        </div>

                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/90 sm:w-auto">
                            Get Started

                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </button>

                    </div>

                </motion.div>

            </div>
        </section>
    );
};

export default WhyOne5;