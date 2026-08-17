import React from "react";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    ListTodo,
    Users,
    Zap,
} from "lucide-react";

const stats = [
    {
        icon: Users,
        value: "10K+",
        label: "Team Members",
        description: "People working together",
    },
    {
        icon: ListTodo,
        value: "50K+",
        label: "Tasks Managed",
        description: "Tasks created and assigned",
    },
    {
        icon: CheckCircle2,
        value: "95%",
        label: "Completion Rate",
        description: "Tasks completed successfully",
    },
    {
        icon: Zap,
        value: "24/7",
        label: "Workspace Access",
        description: "Work from anywhere",
    },
];

const Stats = () => {
    return (
        <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20 text-black">

            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.025] blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-12 max-w-2xl text-center"
                >
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-black/40">
                        Built for productive teams
                    </p>

                    <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                        Everything your team needs
                        <br />
                        <span className="text-black/40">
                            to get work done.
                        </span>
                    </h2>
                </motion.div>


                <div className="grid overflow-hidden rounded-3xl border border-black/10 bg-white sm:grid-cols-2 lg:grid-cols-4">

                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <motion.div
                                key={stat.label}
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
                                    delay: index * 0.1,
                                }}
                                whileHover={{
                                    backgroundColor: "rgba(0,0,0,0.025)",
                                }}
                                className={`group relative p-7 transition ${index !== 0
                                    ? "border-t border-black/10 sm:border-l sm:border-t-0"
                                    : ""
                                    } ${index === 2
                                        ? "lg:border-l"
                                        : ""
                                    }`}
                            >


                                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white transition-transform duration-300 group-hover:scale-110">
                                    <Icon size={20} />
                                </div>


                                <h3 className="text-4xl font-bold tracking-[-0.04em]">
                                    {stat.value}
                                </h3>


                                <p className="mt-2 font-semibold">
                                    {stat.label}
                                </p>


                                <p className="mt-1 text-sm text-black/40">
                                    {stat.description}
                                </p>


                                <div className="absolute bottom-0 left-7 right-7 h-px origin-left scale-x-0 bg-black transition-transform duration-500 group-hover:scale-x-100" />

                            </motion.div>
                        );
                    })}

                </div>


                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <p className="text-sm text-black/40">
                        One simple workspace. One connected team. One place to get work done.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default Stats;