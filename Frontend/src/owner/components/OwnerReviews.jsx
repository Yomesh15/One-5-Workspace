import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Eye,
  FileCheck2,
  MessageSquare,
  Search,
  X,
} from "lucide-react";

const OwnerReviews = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [reviews, setReviews] = useState([
    {
      id: 1,
      title: "Build authentication system",
      description:
        "Login, register and forgot password functionality completed.",
      workspace: "One 5 Workspace",
      member: "Aarav Sharma",
      submitted: "10 min ago",
      status: "Pending Review",
      link: "https://github.com/example/auth",
    },
    {
      id: 2,
      title: "Dashboard UI",
      description:
        "Responsive owner dashboard interface has been completed.",
      workspace: "One 5 Workspace",
      member: "Dev Kumar",
      submitted: "35 min ago",
      status: "Pending Review",
      link: "https://github.com/example/dashboard",
    },
    {
      id: 3,
      title: "MongoDB setup",
      description:
        "Database collections and required schemas are ready.",
      workspace: "One 5 Workspace",
      member: "Riya Mehta",
      submitted: "1 hour ago",
      status: "Approved",
      link: "https://github.com/example/database",
    },
    {
      id: 4,
      title: "Landing page",
      description:
        "Marketing landing page completed and deployed.",
      workspace: "Marketing Team",
      member: "Karan Singh",
      submitted: "2 hours ago",
      status: "Pending Review",
      link: "https://example.com",
    },
    {
      id: 5,
      title: "Social media content",
      description:
        "Initial content package submitted for approval.",
      workspace: "Marketing Team",
      member: "Neha Verma",
      submitted: "Yesterday",
      status: "Changes Requested",
      link: "https://drive.google.com/example",
    },
  ]);

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesSearch =
        !query ||
        review.title?.toLowerCase().includes(query) ||
        review.member?.toLowerCase().includes(query) ||
        review.workspace?.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" || review.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [reviews, search, filter]);

  const pendingReviews = reviews.filter(
    (item) => item.status === "Pending Review"
  ).length;

  const approvedReviews = reviews.filter(
    (item) => item.status === "Approved"
  ).length;

  const changesRequested = reviews.filter(
    (item) => item.status === "Changes Requested"
  ).length;

  const approveTask = (id) => {
    setReviews((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            status: "Approved",
          }
          : item
      )
    );

    setSelectedTask(null);
  };

  const requestChanges = () => {
    if (!selectedTask) return;

    setReviews((prev) =>
      prev.map((item) =>
        item.id === selectedTask.id
          ? {
            ...item,
            status: "Changes Requested",
          }
          : item
      )
    );

    setShowReject(false);
    setSelectedTask(null);
    setRejectReason("");
  };

  const closeAllModals = () => {
    setSelectedTask(null);
    setShowReject(false);
    setRejectReason("");
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-3 pb-10 pt-2 text-black sm:px-5 sm:pt-4 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
        >
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35 sm:text-[10px]">
              Task Review
            </p>

            <h1 className="mt-2 break-words text-3xl font-black tracking-[-0.05em] sm:text-4xl md:text-5xl">
              Review submissions.
            </h1>

            <p className="mt-2 max-w-lg text-[10px] leading-5 text-black/45 sm:text-xs">
              Review completed work submitted by your members and
              approve or request changes.
            </p>
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-3">
          <StatCard
            icon={Clock3}
            title="Pending Review"
            value={pendingReviews}
            description="Waiting for your approval"
            dark
          />

          <StatCard
            icon={CheckCircle2}
            title="Approved"
            value={approvedReviews}
            description="Successfully approved"
          />

          <StatCard
            icon={FileCheck2}
            title="Changes Requested"
            value={changesRequested}
            description="Needs member updates"
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:mt-8">
          <div>
            <h2 className="text-lg font-bold tracking-[-0.03em] sm:text-xl">
              Submissions
            </h2>

            <p className="mt-1 text-[9px] text-black/40 sm:text-[10px]">
              {filteredReviews.length} submission
              {filteredReviews.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <div className="relative min-w-0 flex-1 sm:max-w-[300px]">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search submissions..."
                className="h-11 w-full rounded-xl border border-black/10 bg-white pl-9 pr-4 text-[10px] outline-none transition focus:border-black/30 sm:text-[11px]"
              />
            </div>

            <div className="relative w-full sm:w-auto sm:min-w-[155px]">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-black/10 bg-white pl-3 pr-10 text-[10px] font-medium outline-none transition focus:border-black/30"
              >
                <option value="All">All Status</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Changes Requested">
                  Changes Requested
                </option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40"
              />
            </div>

          </div>
        </div>

        <div className="mt-4 space-y-3">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.04,
              }}
              className="w-full min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-white p-4 transition-all hover:border-black/20 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)] sm:p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white sm:h-11 sm:w-11">
                    <FileCheck2 size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <h3 className="max-w-full break-words text-sm font-bold tracking-[-0.02em] sm:text-[15px]">
                        {review.title}
                      </h3>

                      <span className="max-w-full truncate rounded-full bg-black/[0.05] px-2 py-1 text-[7px] font-semibold text-black/40">
                        {review.workspace}
                      </span>
                    </div>

                    <p className="mt-1.5 line-clamp-2 text-[9px] leading-4 text-black/40">
                      {review.description}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[8px] text-black/35">
                      <span>
                        Submitted by{" "}
                        <b className="text-black/60">
                          {review.member}
                        </b>
                      </span>

                      <span>{review.submitted}</span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center lg:w-auto lg:justify-end">
                  <span
                    className={`w-fit rounded-full px-2.5 py-1.5 text-[7px] font-bold ${review.status === "Pending Review"
                        ? "bg-black text-white"
                        : review.status === "Approved"
                          ? "bg-black/[0.08] text-black/60"
                          : "bg-black/[0.04] text-black/40"
                      }`}
                  >
                    {review.status}
                  </span>

                  <button
                    onClick={() => setSelectedTask(review)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-black/10 px-3 py-2.5 text-[9px] font-semibold transition hover:bg-black/[0.04] sm:w-auto"
                  >
                    <Eye size={12} />
                    Review
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="mt-4 rounded-2xl border border-dashed border-black/15 bg-white px-4 py-14 text-center sm:px-5">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
              <Search size={16} />
            </div>

            <h3 className="mt-4 text-sm font-bold">
              No submissions found
            </h3>

            <p className="mx-auto mt-1.5 max-w-xs text-[10px] leading-4 text-black/40">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedTask && !showReject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAllModals}
              className="fixed inset-0 z-50 bg-black/40 px-3 backdrop-blur-sm sm:px-5"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-24px)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:w-[calc(100%-40px)] sm:p-6"
            >
              <div className="flex min-w-0 items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                    Submission
                  </p>

                  <h2 className="mt-1.5 break-words text-lg font-bold tracking-[-0.04em] sm:text-xl">
                    {selectedTask.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedTask(null)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/10"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="mt-5 rounded-xl bg-black/[0.03] p-3.5 sm:p-4">
                <p className="text-[10px] leading-5 text-black/50">
                  {selectedTask.description}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
                  <div className="min-w-0">
                    <p className="text-[8px] text-black/35">
                      Submitted By
                    </p>

                    <p className="mt-1 truncate text-[10px] font-bold">
                      {selectedTask.member}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[8px] text-black/35">
                      Workspace
                    </p>

                    <p className="mt-1 truncate text-[10px] font-bold">
                      {selectedTask.workspace}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={selectedTask.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex min-w-0 items-center justify-between gap-3 rounded-xl border border-black/10 px-3.5 py-3 text-[9px] font-semibold transition hover:bg-black/[0.04] sm:px-4 sm:text-[10px]"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <ExternalLink
                    size={13}
                    className="shrink-0"
                  />

                  <span className="truncate">
                    View submitted work
                  </span>
                </span>

                <ArrowRight size={13} className="shrink-0" />
              </a>

              {selectedTask.status === "Pending Review" && (
                <div className="mt-5 flex flex-col gap-2 min-[400px]:flex-row">
                  <button
                    onClick={() => setShowReject(true)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 py-3 text-[10px] font-semibold"
                  >
                    <MessageSquare size={13} />
                    Request Changes
                  </button>

                  <button
                    onClick={() => approveTask(selectedTask.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black py-3 text-[10px] font-semibold text-white"
                  >
                    <Check size={13} />
                    Approve
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReject && selectedTask && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 px-3 backdrop-blur-sm sm:px-5"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              className="fixed left-1/2 top-1/2 z-[60] max-h-[90vh] w-[calc(100%-24px)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:w-[calc(100%-40px)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                    Feedback
                  </p>

                  <h2 className="mt-1.5 text-lg font-bold sm:text-xl">
                    Request changes
                  </h2>
                </div>

                <button
                  onClick={() => setShowReject(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/10"
                >
                  <X size={14} />
                </button>
              </div>

              <textarea
                value={rejectReason}
                onChange={(e) =>
                  setRejectReason(e.target.value)
                }
                rows={5}
                placeholder="Tell the member what needs to be changed..."
                className="mt-5 w-full resize-none rounded-xl border border-black/10 p-3 text-[10px] outline-none focus:border-black"
              />

              <div className="mt-4 flex flex-col gap-2 min-[400px]:flex-row">
                <button
                  onClick={() => setShowReject(false)}
                  className="flex-1 rounded-xl border border-black/10 py-3 text-[10px] font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={requestChanges}
                  className="flex-1 rounded-xl bg-black py-3 text-[10px] font-semibold text-white"
                >
                  Send Feedback
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
  dark = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`min-w-0 rounded-2xl border p-4 sm:p-5 ${dark
          ? "border-black bg-black text-white"
          : "border-black/10 bg-white text-black"
        }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${dark ? "bg-white text-black" : "bg-black text-white"
          }`}
      >
        <Icon size={16} />
      </div>

      <p
        className={`mt-4 text-[9px] sm:mt-5 sm:text-[10px] ${dark ? "text-white/45" : "text-black/40"
          }`}
      >
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold sm:text-3xl">
        {value}
      </p>

      <p
        className={`mt-1 text-[8px] sm:text-[9px] ${dark ? "text-white/35" : "text-black/35"
          }`}
      >
        {description}
      </p>
    </motion.div>
  );
};

export default OwnerReviews;