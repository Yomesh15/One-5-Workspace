import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardPlus,
  FolderPlus,
  UserPlus,
  FileCheck2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OwnerQuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: FolderPlus,
      title: "Create workspace",
      description: "Start a new workspace for your team.",
      path: "/owner-workspaces",
    },
    {
      icon: UserPlus,
      title: "Add member",
      description: "Invite a member to your workspace.",
      path: "/owner-members",
    },
    {
      icon: ClipboardPlus,
      title: "Create task",
      description: "Assign new work to your team.",
      path: "/owner-tasks",
    },
    {
      icon: FileCheck2,
      title: "Review submissions",
      description: "Check completed work from members.",
      path: "/owner-reviews",
    },
  ];

  return (
    <section className="w-full px-3 pb-12 pt-4 text-black sm:px-5 sm:pb-16 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-3xl border border-black/10 bg-black p-5 text-white sm:p-7 md:p-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
                Quick Actions
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] sm:text-3xl">
                Keep your workspace moving.
              </h2>

              <p className="mt-2 max-w-lg text-[10px] leading-5 text-white/45 sm:text-xs">
                Quickly manage your workspaces, members, tasks and
                submissions from one place.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map((action, index) => {
              const Icon = action.icon;

              return (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                  }}
                  onClick={() => navigate(action.path)}
                  className="group min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-left transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black">
                      <Icon size={15} />
                    </div>

                    <ArrowRight
                      size={14}
                      className="mt-1 shrink-0 text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                    />
                  </div>

                  <h3 className="mt-5 text-[11px] font-bold tracking-[-0.02em] sm:text-xs">
                    {action.title}
                  </h3>

                  <p className="mt-1.5 text-[8px] leading-4 text-white/40 sm:text-[9px]">
                    {action.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OwnerQuickActions;