import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Users,
  Zap,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OwnerHero = () => {
  const navigate = useNavigate()

  const [owner, setowner] = useState(null)

  const fetchowner = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/owner/currentowner`, { withCredentials: true })
      setowner(res.data.owner)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchowner()
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-white text-black">

      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute -right-40 top-20 h-[450px] w-[450px] rounded-full border border-black/10" />
      <div className="pointer-events-none absolute -right-24 top-36 h-[320px] w-[320px] rounded-full border border-black/10" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.03] px-4 py-2 text-xs font-medium tracking-wide"
            >
              <span className="flex h-2 w-2 rounded-full bg-black" />
              WORKSPACE MANAGEMENT, SIMPLIFIED
            </motion.div>


            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[82px]">
              Get the work
              <br />
              <span className="relative inline-block">
                moving.
                <span className="absolute -bottom-1 left-0 h-[3px] w-16 bg-black sm:w-24" />
              </span>
            </h1>


            <p className="mt-8 max-w-xl text-base leading-7 text-black/55 sm:text-lg sm:leading-8">
              Create your workspace, bring your team together, assign work,
              track progress, and review completed tasks — all from one
              beautifully simple place.
            </p>


            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  if (owner === null) {
                    navigate('/owner-login')
                  }
                  else {
                    navigate('/create-workspace')
                  }
                }}
                className="group flex items-center justify-center gap-3 rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black/90 hover:shadow-xl">
                {owner === null ? "Get Started" : "Create Workspace"}
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button onClick={() => navigate('/owner-workspace')} className="flex items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-black/[0.03]">
                Explore Dashboard
              </button>
            </div>


            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-black/50">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-black" />
                Easy team management
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-black" />
                Simple task tracking
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-black" />
                Built for teams
              </span>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[540px]"
          >

            <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white p-4 shadow-[0_30px_80px_rgba(0,0,0,0.12)] sm:p-5">

              <div className="mb-5 flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  </div>

                  <span className="ml-2 text-xs font-semibold tracking-wide">
                    One 5 Workspace
                  </span>
                </div>

                <div className="rounded-lg bg-black px-3 py-1.5 text-[10px] font-semibold text-white">
                  OWNER
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium text-black/40">
                    Good morning
                  </p>

                  <h2 className="mt-1 text-2xl font-bold tracking-tight">
                    Workspace overview
                  </h2>
                </div>

                <div className="hidden rounded-xl border border-black/10 px-3 py-2 sm:block">
                  <p className="text-[9px] text-black/40">STATUS</p>
                  <p className="mt-0.5 text-xs font-bold">Active</p>
                </div>
              </div>


              <div className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
                <div className="rounded-2xl bg-black p-3.5 text-white sm:p-4">
                  <Users size={17} />
                  <p className="mt-4 text-xl font-bold">12</p>
                  <p className="mt-0.5 text-[10px] text-white/50">
                    Members
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 p-3.5 sm:p-4">
                  <ClipboardCheck size={17} />
                  <p className="mt-4 text-xl font-bold">28</p>
                  <p className="mt-0.5 text-[10px] text-black/40">
                    Tasks
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 p-3.5 sm:p-4">
                  <Clock3 size={17} />
                  <p className="mt-4 text-xl font-bold">08</p>
                  <p className="mt-0.5 text-[10px] text-black/40">
                    Pending
                  </p>
                </div>
              </div>


              <div className="mt-5 rounded-2xl border border-black/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold">Team progress</p>
                    <p className="mt-1 text-[10px] text-black/40">
                      Current workspace performance
                    </p>
                  </div>

                  <span className="text-sm font-bold">78%</span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/[0.07]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1.2, delay: 0.7 }}
                    className="h-full rounded-full bg-black"
                  />
                </div>
              </div>


              <div className="mt-5 rounded-2xl border border-black/10 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-semibold">Recent tasks</p>
                  <span className="text-[10px] font-medium text-black/40">
                    View all
                  </span>
                </div>

                <div className="space-y-2.5">
                  <TaskRow
                    title="Landing page redesign"
                    member="Aarav"
                    status="Completed"
                    completed
                  />

                  <TaskRow
                    title="API integration"
                    member="Riya"
                    status="In Review"
                  />

                  <TaskRow
                    title="Mobile responsive UI"
                    member="Dev"
                    status="In Progress"
                  />
                </div>
              </div>
            </div>


            <motion.div
              initial={{ opacity: 0, x: 25, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -right-3 top-16 hidden w-48 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:block lg:-right-8"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                  <Zap size={16} />
                </div>

                <div>
                  <p className="text-xs font-bold">Task completed</p>
                  <p className="mt-1 text-[10px] leading-4 text-black/40">
                    Landing page was submitted for review.
                  </p>
                </div>
              </div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute -bottom-5 -left-3 hidden w-48 rounded-2xl border border-black/10 bg-black p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:block lg:-left-10"
            >
              <p className="text-[10px] text-white/45">TEAM ACTIVITY</p>

              <div className="mt-3 flex items-center">
                <div className="flex -space-x-2">
                  {["A", "R", "D", "K"].map((letter, index) => (
                    <div
                      key={index}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white text-[10px] font-bold text-black"
                    >
                      {letter}
                    </div>
                  ))}
                </div>

                <div className="ml-3">
                  <p className="text-xs font-semibold">12 active</p>
                  <p className="text-[9px] text-white/40">
                    members today
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

const TaskRow = ({ title, member, status, completed }) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-black/[0.025] px-3 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${completed ? "bg-black text-white" : "border border-black/10"
            }`}
        >
          {completed && <CheckCircle2 size={14} />}
        </div>

        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold">{title}</p>
          <p className="mt-0.5 text-[9px] text-black/40">{member}</p>
        </div>
      </div>

      <span className="ml-2 hidden whitespace-nowrap text-[9px] font-medium text-black/45 sm:block">
        {status}
      </span>
    </div>
  );
};

export default OwnerHero;