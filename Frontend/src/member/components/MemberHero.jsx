import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Users,
  Zap,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MemberHero = () => {
  const [member, setMember] = useState(null)
  const navigate = useNavigate()

  const fetchMember = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/member/currentmember`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setMember(res.data.member);
      } else {
        setMember(null);
      }
    } catch (error) {
      setMember(null);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);


  return (

    <section className="relative min-h-screen overflow-hidden bg-white text-black">

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-black/[0.04] blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-5 py-11 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid w-full items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-sm font-medium"
            >
              <span className="h-2 w-2 rounded-full bg-black" />
              Smart Workspace Management
            </motion.div>


            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Work smarter.
              <br />

              <span className="text-black/50">
                Together.
              </span>
            </h1>


            <p className="mt-7 max-w-xl text-lg leading-8 text-black/60 sm:text-xl">
              One 5 Workspace helps teams organize work, assign tasks,
              track progress, and get everything completed in one simple
              workspace.
            </p>


            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (member === null) {
                    navigate('/member-login')
                  }
                  else {
                    navigate("/member-tasks")
                  }
                }}
                className="group flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/10 transition hover:bg-black/90"
              >
                {member === null ? "Get Started" : "Start Working"}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/member-workspace")}
                className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3.5 font-semibold text-black transition hover:bg-black/[0.03]"
              >
                Explore Workspace
              </motion.button>
            </div>


            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-black/50">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} />
                Easy to use
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} />
                Team focused
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} />
                Simple workflow
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >

            <div className="absolute -inset-10 rounded-[40px] bg-black/[0.05] blur-3xl" />


            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-3xl border border-black/10 bg-white p-3 shadow-2xl shadow-black/10"
            >

              <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
                    5
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      One 5 Workspace
                    </p>
                    <p className="text-xs text-black/40">
                      Development Team
                    </p>
                  </div>
                </div>

                <div className="flex -space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black text-xs text-white">
                    Y
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/70 text-xs text-white">
                    A
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/30 text-xs">
                    +
                  </div>
                </div>
              </div>


              <div className="grid gap-4 p-4 sm:grid-cols-3">

                <div className="hidden rounded-2xl bg-black/[0.03] p-3 sm:block">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-black/40">
                    Workspace
                  </p>

                  <div className="space-y-2">
                    <div className="rounded-lg bg-black px-3 py-2 text-xs font-medium text-white">
                      Overview
                    </div>

                    <div className="rounded-lg px-3 py-2 text-xs text-black/50">
                      My Tasks
                    </div>

                    <div className="rounded-lg px-3 py-2 text-xs text-black/50">
                      Team
                    </div>

                    <div className="rounded-lg px-3 py-2 text-xs text-black/50">
                      Projects
                    </div>
                  </div>
                </div>


                <div className="sm:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold">
                        Today's Tasks
                      </p>
                      <p className="text-xs text-black/40">
                        Keep your team moving forward
                      </p>
                    </div>

                    <div className="rounded-lg bg-black px-3 py-2 text-xs font-medium text-white">
                      + Add Task
                    </div>
                  </div>

                  <div className="space-y-3">

                    <Task
                      icon={<ClipboardCheck size={16} />}
                      title="Build dashboard UI"
                      member="Yomesh"
                      status="In Progress"
                      progress="70%"
                    />

                    <Task
                      icon={<Users size={16} />}
                      title="Create team management"
                      member="Aman"
                      status="Review"
                      progress="90%"
                    />

                    <Task
                      icon={<Zap size={16} />}
                      title="Deploy backend API"
                      member="Rahul"
                      status="Completed"
                      progress="100%"
                    />

                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-black/10 p-4">

                <Stat
                  value="24"
                  label="Total Tasks"
                />

                <Stat
                  value="18"
                  label="Completed"
                />

                <Stat
                  value="75%"
                  label="Progress"
                />

              </div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-black/10 bg-white p-4 shadow-xl sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Task completed
                  </p>
                  <p className="text-xs text-black/40">
                    Just now
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

/* TASK COMPONENT */
const Task = ({ icon, title, member, status, progress }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-black/10 bg-white p-3 transition hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-3">

        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.05]">
            {icon}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {title}
            </p>

            <p className="mt-1 text-xs text-black/40">
              Assigned to {member}
            </p>
          </div>
        </div>

        <span className="hidden rounded-full bg-black/[0.05] px-3 py-1 text-[10px] font-medium sm:block">
          {status}
        </span>
      </div>


      <div className="mt-3">
        <div className="mb-1 flex justify-between text-[10px] text-black/40">
          <span>Progress</span>
          <span>{progress}</span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-black"
            style={{ width: progress }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* STAT COMPONENT */
const Stat = ({ value, label }) => {
  return (
    <div className="rounded-xl bg-black/[0.03] p-3">
      <p className="text-lg font-bold">{value}</p>
      <p className="mt-1 text-[10px] text-black/40">
        {label}
      </p>
    </div>
  );
};

export default MemberHero;