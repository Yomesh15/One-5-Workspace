import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ClipboardCheck,
  FolderKanban,
  ListTodo,
  MessageSquareText,
  Users,
  Workflow,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    number: "01",
    icon: FolderKanban,
    title: "Smart Workspaces",
    description:
      "Create dedicated workspaces for different teams, projects, or departments and keep everything organized in one place.",
    className: "lg:col-span-2",
  },
  {
    number: "02",
    icon: Users,
    title: "Team Management",
    description:
      "Add members to your workspace and easily manage who is part of your team.",
    className: "lg:col-span-1",
  },
  {
    number: "03",
    icon: ListTodo,
    title: "Task Assignment",
    description:
      "Create tasks and assign them directly to the right team member with clear responsibilities.",
    className: "lg:col-span-1",
  },
  {
    number: "04",
    icon: Workflow,
    title: "Progress Tracking",
    description:
      "See how work is progressing and understand what is pending, active, completed, or waiting for review.",
    className: "lg:col-span-2",
  },
  {
    number: "05",
    icon: ClipboardCheck,
    title: "Task Review",
    description:
      "Members can submit completed work with a link and owners can review the submission before approving it.",
    className: "lg:col-span-1",
  },
  {
    number: "06",
    icon: MessageSquareText,
    title: "Clear Collaboration",
    description:
      "Keep tasks, team members, progress, and completed work connected instead of scattered across different platforms.",
    className: "lg:col-span-1",
  },
];

const Features = () => {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-13 text-black sm:py-20 lg:py-28">

      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-black/[0.025] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-9 max-w-3xl sm:mb-16"
        >

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-black" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
              Everything in one place
            </span>
          </div>


          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Built to keep your
            <br />
            <span className="text-black/40">
              team moving.
            </span>
          </h2>


         <p className="mt-4 max-w-2xl text-base leading-7 text-black/50 sm:mt-6 sm:text-lg">
            One 5 Workspace gives owners and team members everything they
            need to organize work, stay accountable, and complete tasks
            without unnecessary complexity.
          </p>
        </motion.div>


        <div className="grid gap-4 lg:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.number}
                initial={{
                  opacity: 0,
                  y: 35,
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
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                className={`group relative overflow-hidden rounded-3xl border border-black/10 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-black/20 hover:shadow-2xl hover:shadow-black/[0.06] sm:p-8 ${feature.className}`}
              >


                <div className="absolute right-7 top-7 text-xs font-semibold text-black/20">
                  {feature.number}
                </div>


                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: -4,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"
                >
                  <Icon size={21} />
                </motion.div>


                <div className="mt-6 max-w-xl sm:mt-8">
                  <h3 className="text-2xl font-bold tracking-[-0.02em]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-black/50 sm:text-base">
                    {feature.description}
                  </p>
                </div>


                <div className="absolute bottom-7 right-7 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-black/10 bg-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </div>


                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-black transition-transform duration-500 group-hover:scale-x-100" />


                <Icon
                  size={150}
                  strokeWidth={0.5}
                  className="pointer-events-none absolute -bottom-12 -right-12 rotate-[-10deg] text-black/[0.025] transition-all duration-700 group-hover:scale-110 group-hover:text-black/[0.05]"
                />

              </motion.div>
            );
          })}

        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl border border-black/10 bg-black p-7 text-white sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <p className="text-lg font-semibold">
              Everything your team needs.
            </p>

            <p className="mt-1 text-sm text-white/50">
              Simple tools. Clear workflow. Better work.
            </p>
          </div>

          <button onClick={() => navigate("/member-workspace")} className="group flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
            Explore Workspace

            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Features;