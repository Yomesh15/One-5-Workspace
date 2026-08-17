import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ClipboardList,
  Eye,
  LayoutDashboard,
  Settings,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";

const roles = {
  owner: {
    label: "Workspace Owner",
    shortLabel: "Owner",
    title: "Lead your team.",
    description:
      "Create workspaces, manage members, assign tasks, monitor progress, and review completed work from one place.",
    icon: LayoutDashboard,
    features: [
      {
        icon: LayoutDashboard,
        title: "Create Workspaces",
        text: "Create and manage dedicated workspaces.",
      },
      {
        icon: UserPlus,
        title: "Manage Members",
        text: "Add and manage your workspace team.",
      },
      {
        icon: ClipboardList,
        title: "Assign Tasks",
        text: "Create tasks and assign them to members.",
      },
      {
        icon: Eye,
        title: "Monitor Progress",
        text: "See how your team's work is progressing.",
      },
      {
        icon: Check,
        title: "Review Work",
        text: "Review completed tasks before approving them.",
      },
      {
        icon: Settings,
        title: "Control Workspace",
        text: "Manage your workspace and its workflow.",
      },
    ],
  },

  member: {
    label: "Team Member",
    shortLabel: "Member",
    title: "Get your work done.",
    description:
      "See assigned tasks, update your progress, submit completed work, and stay focused on what matters.",
    icon: Users,
    features: [
      {
        icon: ClipboardList,
        title: "View Your Tasks",
        text: "See all tasks assigned to you.",
      },
      {
        icon: LayoutDashboard,
        title: "Track Your Work",
        text: "Keep track of your current workload.",
      },
      {
        icon: Upload,
        title: "Update Progress",
        text: "Keep your task progress up to date.",
      },
      {
        icon: Check,
        title: "Complete Tasks",
        text: "Mark your work as completed when finished.",
      },
      {
        icon: Upload,
        title: "Submit Work",
        text: "Attach a link to your completed work.",
      },
      {
        icon: Eye,
        title: "Track Reviews",
        text: "Know when your submitted work is reviewed.",
      },
    ],
  },
};

const OwnerVsMember = () => {
  const [activeRole, setActiveRole] = useState("owner");

  const role = roles[activeRole];
  const RoleIcon = role.icon;

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-12 text-black sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.025] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5">
            <span className="h-px w-7 bg-black" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 sm:text-xs">
              Built for everyone
            </span>

            <span className="h-px w-7 bg-black" />
          </div>

          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            One workspace.
            <br />
            <span className="text-black/40">Two powerful roles.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/50 sm:mt-6 sm:text-lg sm:leading-7">
            Owners organize the work. Members execute it. One 5 Workspace
            gives both sides exactly what they need.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-7 flex w-fit rounded-xl border border-black/10 bg-white p-1 shadow-sm sm:mt-10 sm:rounded-2xl sm:p-1.5"
        >
          <button
            onClick={() => setActiveRole("owner")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm ${activeRole === "owner"
                ? "bg-black text-white shadow-lg"
                : "text-black/40 hover:text-black"
              }`}
          >
            <LayoutDashboard size={15} className="sm:hidden" />
            <LayoutDashboard size={17} className="hidden sm:block" />
            Owner
          </button>

          <button
            onClick={() => setActiveRole("member")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm ${activeRole === "member"
                ? "bg-black text-white shadow-lg"
                : "text-black/40 hover:text-black"
              }`}
          >
            <Users size={15} className="sm:hidden" />
            <Users size={17} className="hidden sm:block" />
            Member
          </button>
        </motion.div>

        <div className="mt-7 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-xl shadow-black/[0.035] sm:mt-10 sm:rounded-[32px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                <div className="relative overflow-hidden bg-black p-6 text-white sm:p-10 lg:p-14">
                  <RoleIcon
                    size={220}
                    strokeWidth={0.5}
                    className="pointer-events-none absolute -bottom-16 -right-16 rotate-[-10deg] text-white/[0.035]"
                  />

                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black sm:h-14 sm:w-14 sm:rounded-2xl">
                      <RoleIcon size={21} className="sm:hidden" />
                      <RoleIcon size={24} className="hidden sm:block" />
                    </div>

                    <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 sm:mt-8 sm:text-xs">
                      {role.label}
                    </p>

                    <h3 className="mt-3 max-w-md text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:mt-4 sm:text-5xl">
                      {role.title}
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-6 text-white/50 sm:mt-6 sm:text-base sm:leading-7">
                      {role.description}
                    </p>

                    <button className="group mt-6 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-black transition hover:bg-white/90 sm:mt-8 sm:text-sm">
                      {activeRole === "owner"
                        ? "Create Workspace"
                        : "Join Workspace"}

                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-10 lg:p-14">
                  <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
                    <div>
                      <p className="text-sm font-semibold">
                        What you can do
                      </p>

                      <p className="mt-1 text-[10px] text-black/40 sm:text-xs">
                        Features available to{" "}
                        {role.shortLabel.toLowerCase()}s
                      </p>
                    </div>

                    <div className="shrink-0 rounded-full bg-black/[0.04] px-2.5 py-1.5 text-[10px] font-medium text-black/50 sm:px-3 sm:text-xs">
                      {role.features.length} capabilities
                    </div>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                    {role.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;

                      return (
                        <motion.div
                          key={feature.title}
                          initial={{
                            opacity: 0,
                            y: 12,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: index * 0.05,
                          }}
                          whileHover={{
                            y: -2,
                          }}
                          className="group rounded-xl border border-black/10 p-4 transition-all duration-300 hover:border-black/20 hover:bg-black/[0.02] hover:shadow-md sm:rounded-2xl sm:p-5"
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white sm:h-10 sm:w-10 sm:rounded-xl">
                              <FeatureIcon size={16} />
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-xs font-semibold sm:text-sm">
                                {feature.title}
                              </h4>

                              <p className="mt-1 text-[10px] leading-4 text-black/40 sm:mt-1.5 sm:text-xs sm:leading-5">
                                {feature.text}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-6 flex flex-col items-center justify-center gap-2.5 text-center sm:mt-8 sm:flex-row sm:gap-3"
        >
          <div className="flex items-center gap-2 text-xs font-medium sm:text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[9px] text-white sm:h-7 sm:w-7 sm:text-xs">
              O
            </span>
            Owner assigns work
          </div>

          <ArrowRight
            size={15}
            className="rotate-90 text-black/20 sm:rotate-0"
          />

          <div className="flex items-center gap-2 text-xs font-medium sm:text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[9px] text-white sm:h-7 sm:w-7 sm:text-xs">
              M
            </span>
            Member completes it
          </div>

          <ArrowRight
            size={15}
            className="rotate-90 text-black/20 sm:rotate-0"
          />

          <div className="flex items-center gap-2 text-xs font-medium sm:text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[9px] text-white sm:h-7 sm:w-7 sm:text-xs">
              ✓
            </span>
            Owner reviews it
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OwnerVsMember;