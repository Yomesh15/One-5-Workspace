import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  Filter,
  MoreHorizontal,
  Search,
  User,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OwnerTasks = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/owner/gettasks`,
        {
          withCredentials: true,
        }
      ); 

      if (response.data.success) {
        const fetchedTasks =
          response.data.tasks ||
          response.data.data?.tasks ||
          response.data.data ||
          [];

        setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
      } else {
        setTasks([]);
        toast.error(response.data.message || "Failed to fetch tasks");
      }
    } catch (error) {
      console.log("Get tasks error:", error);

      setTasks([]);

      toast.error(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getTaskId = (task) => {
    return task?._id || task?.id;
  };

  const getTaskTitle = (task) => {
    return (
      task?.title ||
      task?.taskTitle ||
      task?.name ||
      "Untitled Task"
    );
  };

  const getTaskDescription = (task) => {
    return (
      task?.description ||
      task?.taskDescription ||
      "No description available."
    );
  };

  const getWorkspaceName = (task) => {
    if (typeof task?.workspace === "string") {
      return task.workspace;
    }

    if (task?.workspace?.title) {
      return task.workspace.title;
    }

    if (task?.workspace?.name) {
      return task.workspace.name;
    }

    return task?.workspaceName || "Workspace";
  };

  const getMemberName = (task) => {
    if (typeof task?.assignedTo === "string") {
      return task.assignedTo;
    }

    if (task?.assignedTo?.fullname) {
      return task.assignedTo.fullname;
    }

    if (task?.assignedTo?.name) {
      return task.assignedTo.name;
    }

    if (typeof task?.member === "string") {
      return task.member;
    }

    if (task?.member?.fullname) {
      return task.member.fullname;
    }

    if (task?.member?.name) {
      return task.member.name;
    }

    if (task?.assignedMember?.fullname) {
      return task.assignedMember.fullname;
    }

    return task?.memberName || "Unassigned";
  };

  const getPriority = (task) => {
    return task?.priority || "Medium";
  };

  const getStatus = (task) => {
    return task?.status || "Pending";
  };

  const getDueDate = (task) => {
    return (
      task?.dueDate ||
      task?.deadline ||
      task?.endDate ||
      task?.due ||
      null
    );
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const normalizedTasks = useMemo(() => {
    return tasks.map((task) => ({
      ...task,
      taskId: getTaskId(task),
      displayTitle: getTaskTitle(task),
      displayDescription: getTaskDescription(task),
      displayWorkspace: getWorkspaceName(task),
      displayMember: getMemberName(task),
      displayPriority: getPriority(task),
      displayStatus: getStatus(task),
      displayDueDate: getDueDate(task),
    }));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return normalizedTasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.displayTitle.toLowerCase().includes(query) ||
        task.displayDescription.toLowerCase().includes(query) ||
        task.displayMember.toLowerCase().includes(query) ||
        task.displayWorkspace.toLowerCase().includes(query) ||
        task.displayPriority.toLowerCase().includes(query) ||
        task.displayStatus.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" || task.displayStatus === filter;

      return matchesSearch && matchesFilter;
    });
  }, [normalizedTasks, search, filter]);

  const totalTasks = normalizedTasks.length;

  const pendingTasks = normalizedTasks.filter(
    (task) => task.displayStatus === "Pending"
  ).length;

  const reviewTasks = normalizedTasks.filter(
    (task) => task.displayStatus === "Review"
  ).length;

  const completedTasks = normalizedTasks.filter(
    (task) =>
      task.displayStatus === "Completed" ||
      task.displayStatus === "completed"
  ).length;

  const inProgressTasks = normalizedTasks.filter(
    (task) => task.displayStatus === "In Progress"
  ).length;

  const handleOpenTask = (task) => {
    const id = getTaskId(task);

    if (!id) {
      toast.error("Task ID not found");
      return;
    }

    navigate(`/owner-task/${id}`);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-3 pb-10 pt-1 text-black sm:px-5 sm:pt-3 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35 sm:text-[10px]">
              Task Management
            </p>

            <h1 className="mt-2 break-words text-3xl font-black tracking-[-0.06em] sm:text-4xl md:text-5xl">
              Your tasks.
            </h1>

            <p className="mt-2 max-w-xl text-[10px] leading-5 text-black/45 sm:text-xs">
              Assign work, monitor progress and review completed tasks
              from one place.
            </p>
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={ClipboardList}
            title="Total Tasks"
            value={totalTasks}
            description="All workspace tasks"
            dark
          />

          <StatCard
            icon={Clock3}
            title="Pending"
            value={pendingTasks}
            description="Waiting to start"
          />

          <StatCard
            icon={Filter}
            title="In Review"
            value={reviewTasks}
            description="Waiting for approval"
          />

          <StatCard
            icon={CheckCircle2}
            title="Completed"
            value={completedTasks}
            description="Successfully completed"
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-[-0.03em] sm:text-xl">
              All tasks
            </h2>

            <p className="mt-1 text-[9px] text-black/40 sm:text-[10px]">
              {filteredTasks.length} task
              {filteredTasks.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="h-11 w-full rounded-xl border border-black/10 bg-white pl-10 pr-4 text-[10px] outline-none transition placeholder:text-black/30 focus:border-black/30 sm:text-[11px]"
              />
            </div>

            <div className="relative w-full sm:w-36">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-black/10 bg-white pl-3 pr-10 text-[10px] font-medium outline-none transition focus:border-black/30"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="min-w-0 animate-pulse overflow-hidden rounded-2xl border border-black/10 bg-white p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex gap-2">
                      <div className="h-5 w-20 rounded-full bg-black/10" />
                      <div className="h-5 w-14 rounded-full bg-black/10" />
                    </div>

                    <div className="mt-4 h-4 w-2/3 rounded bg-black/10" />

                    <div className="mt-2 h-3 w-full rounded bg-black/5" />
                    <div className="mt-1 h-3 w-4/5 rounded bg-black/5" />
                  </div>

                  <div className="h-8 w-8 shrink-0 rounded-lg bg-black/10" />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2 min-[390px]:grid-cols-2">
                  <div className="h-16 rounded-xl bg-black/5" />
                  <div className="h-16 rounded-xl bg-black/5" />
                </div>

                <div className="mt-4 h-8 rounded bg-black/5" />
              </div>
            ))}
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            {filteredTasks.map((task, index) => {
              const taskId = task.taskId || index;

              return (
                <motion.div
                  key={taskId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                  }}
                  className="group relative flex min-h-[330px] min-w-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)] sm:p-5"
                >
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span className="max-w-[65%] truncate rounded-full bg-black/[0.05] px-2 py-1 text-[7px] font-semibold text-black/45">
                          {task.displayWorkspace}
                        </span>

                        <span
                          className={`shrink-0 rounded-full px-2 py-1 text-[7px] font-bold ${task.displayPriority === "High"
                            ? "bg-black text-white"
                            : task.displayPriority === "Medium"
                              ? "bg-black/[0.08] text-black/60"
                              : "bg-black/[0.04] text-black/40"
                            }`}
                        >
                          {task.displayPriority}
                        </span>
                      </div>

                      <h3 className="mt-3 line-clamp-2 min-h-[40px] break-words text-sm font-bold leading-5 tracking-[-0.02em] sm:text-[15px]">
                        {task.displayTitle}
                      </h3>

                      <p className="mt-1.5 line-clamp-2 min-h-[32px] break-words text-[9px] leading-4 text-black/40">
                        {task.displayDescription}
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-2 min-[390px]:grid-cols-2">
                    <div className="min-w-0 rounded-xl bg-black/[0.03] p-3">
                      <div className="flex items-center gap-2">
                        <User
                          size={12}
                          className="shrink-0 text-black/40"
                        />

                        <span className="text-[8px] text-black/35">
                          Assigned To
                        </span>
                      </div>

                      <p className="mt-1.5 truncate text-[9px] font-semibold">
                        {task.displayMember}
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-black/[0.03] p-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={12}
                          className="shrink-0 text-black/40"
                        />

                        <span className="text-[8px] text-black/35">
                          Due Date
                        </span>
                      </div>

                      <p className="mt-1.5 truncate text-[9px] font-semibold">
                        {formatDate(task.displayDueDate)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <div className="flex min-w-0 items-center justify-between gap-3 border-t border-black/10 pt-3">
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1.5 text-[7px] font-bold ${task.displayStatus === "Completed"
                          ? "bg-black text-white"
                          : task.displayStatus === "Review"
                            ? "border border-black bg-white text-black"
                            : task.displayStatus === "In Progress"
                              ? "bg-black/[0.08] text-black/60"
                              : "bg-black/[0.04] text-black/40"
                          }`}
                      >
                        {task.displayStatus}
                      </span>

                      {/* <button
                        onClick={() => handleOpenTask(task)}
                        className="flex shrink-0 items-center gap-1 text-[9px] font-bold transition group-hover:gap-2"
                      >
                        Open
                        <ArrowRight size={11} />
                      </button> */}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-black/15 bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
              <Search size={17} />
            </div>

            <h3 className="mt-4 text-sm font-bold">
              {search || filter !== "All"
                ? "No tasks found"
                : "No tasks yet"}
            </h3>

            <p className="mx-auto mt-1.5 max-w-sm text-[10px] leading-4 text-black/40">
              {search || filter !== "All"
                ? "Try changing your search or status filter."
                : "Tasks assigned in your workspaces will appear here."}
            </p>
          </div>
        )}

        {!loading && normalizedTasks.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[8px] text-black/35">
            <span>
              Total: <strong className="text-black/60">{totalTasks}</strong>
            </span>

            <span>
              Pending:{" "}
              <strong className="text-black/60">
                {pendingTasks}
              </strong>
            </span>

            <span>
              In Progress:{" "}
              <strong className="text-black/60">
                {inProgressTasks}
              </strong>
            </span>

            <span>
              Review:{" "}
              <strong className="text-black/60">
                {reviewTasks}
              </strong>
            </span>

            <span>
              Completed:{" "}
              <strong className="text-black/60">
                {completedTasks}
              </strong>
            </span>
          </div>
        )}
      </div>
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
        className={`mt-5 text-[9px] sm:text-[10px] ${dark ? "text-white/45" : "text-black/40"
          }`}
      >
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold sm:text-3xl">
        {value}
      </p>

      <p
        className={`mt-1.5 text-[8px] sm:text-[9px] ${dark ? "text-white/35" : "text-black/35"
          }`}
      >
        {description}
      </p>
    </motion.div>
  );
};

export default OwnerTasks;