import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FolderKanban,
  MoreHorizontal,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OwnerWorkspaces = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/owner/allworkspaces`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setWorkspaces(response.data.workspaces || []);
      } else {
        setWorkspaces([]);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch workspaces"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const filteredWorkspaces = workspaces.filter((workspace) => {
    const query = search.toLowerCase().trim();

    return (
      workspace.title?.toLowerCase().includes(query) ||
      workspace.description?.toLowerCase().includes(query)
    );
  });

  const createWorkspace = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Workspace name is required");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/owner/createworkspace`,
        {
          title: form.title,
          description: form.description,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Workspace created"
        );

        setForm({
          title: "",
          description: "",
        });

        setShowCreate(false);

        fetchWorkspaces();
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create workspace"
      );
    }
  };

  const activeWorkspaces = workspaces.filter(
    (workspace) => workspace.status === "Active"
  ).length;

  const getTaskCount = (workspace) => {
    if (typeof workspace.tasks === "number") {
      return workspace.tasks;
    }

    if (Array.isArray(workspace.tasks)) {
      return workspace.tasks.length;
    }

    return workspace.taskCount || 0;
  };

  const getCompletedCount = (workspace) => {
    if (typeof workspace.completed === "number") {
      return workspace.completed;
    }

    if (Array.isArray(workspace.tasks)) {
      return workspace.tasks.filter(
        (task) =>
          task.status === "Completed" ||
          task.status === "completed"
      ).length;
    }

    return workspace.completedTasks || 0;
  };

  const getMemberCount = (workspace) => {
    if (Array.isArray(workspace.members)) {
      return workspace.members.length;
    }

    return workspace.memberCount || 0;
  };

  const totalMembers = workspaces.reduce(
    (total, workspace) =>
      total + getMemberCount(workspace),
    0
  );

  const formatDate = (date) => {
    if (!date) return "Recently";

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

  return (
    <div className="min-h-screen w-full overflow-x-hidden text-black">
      <div className="mx-auto w-full max-w-[1180px] px-3 pb-10 sm:px-5 lg:px-6">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 pt-2 sm:pt-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35 sm:text-[10px]">
              Management
            </p>

            <h1 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.05em] sm:text-4xl">
              Your workspaces.
            </h1>

            <p className="mt-2 max-w-lg text-[11px] leading-5 text-black/45 sm:text-xs">
              Create and manage your teams and projects from one
              place.
            </p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-[11px] font-semibold text-white transition active:scale-[0.98] sm:w-fit hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Plus size={15} />
            Create Workspace
          </button>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            icon={FolderKanban}
            title="Total Workspaces"
            value={workspaces.length}
          />

          <StatCard
            icon={CheckCircle2}
            title="Active Workspaces"
            value={activeWorkspaces}
          />

          <StatCard
            icon={Users}
            title="Total Members"
            value={totalMembers}
          />
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold tracking-[-0.03em] sm:text-lg">
              All workspaces
            </h2>

            <p className="mt-1 text-[9px] text-black/40 sm:text-[10px]">
              {filteredWorkspaces.length} workspace
              {filteredWorkspaces.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search workspace..."
              className="h-10 w-full rounded-xl border border-black/10 bg-white pl-9 pr-4 text-[11px] outline-none transition focus:border-black/30"
            />
          </div>
        </div>

        {loading ? (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <WorkspaceSkeleton key={item} />
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 items-stretch gap-3 md:grid-cols-2">
            {filteredWorkspaces.map((workspace, index) => {
              const tasks = getTaskCount(workspace);
              const completed = getCompletedCount(workspace);
              const members = getMemberCount(workspace);

              const progress =
                tasks > 0
                  ? Math.min(
                      100,
                      Math.round((completed / tasks) * 100)
                    )
                  : 0;

              return (
                <motion.div
                  key={workspace._id || workspace.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                  }}
                  className="group flex h-[300px] min-w-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)] sm:h-[310px]"
                >
                  <div className="flex shrink-0 items-start justify-between">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                      <FolderKanban size={17} />
                    </div>

                    <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/10 transition hover:bg-black/[0.04]">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>

                  <div className="mt-5 min-w-0 shrink-0">
                    <div className="flex min-w-0 items-center gap-2">
                      <h3
                        title={workspace.title}
                        className="min-w-0 flex-1 truncate text-sm font-bold tracking-[-0.02em]"
                      >
                        {workspace.title || "Untitled Workspace"}
                      </h3>

                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[7px] font-bold ${
                          workspace.status === "Active"
                            ? "bg-black text-white"
                            : "bg-black/[0.06] text-black/45"
                        }`}
                      >
                        {workspace.status || "Active"}
                      </span>
                    </div>

                    <p
                      title={workspace.description}
                      className="mt-2 h-8 overflow-hidden text-[10px] leading-4 text-black/40"
                    >
                      {workspace.description ||
                        "Workspace created for team collaboration."}
                    </p>
                  </div>

                  <div className="mt-5 grid shrink-0 grid-cols-2 gap-2">
                    <div className="min-w-0 rounded-xl bg-black/[0.03] p-3">
                      <div className="flex items-center gap-2">
                        <Users
                          size={12}
                          className="shrink-0 text-black/45"
                        />

                        <span className="text-[9px] text-black/40">
                          Members
                        </span>
                      </div>

                      <p className="mt-1.5 text-base font-bold">
                        {members}
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-black/[0.03] p-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          size={12}
                          className="shrink-0 text-black/45"
                        />

                        <span className="text-[9px] text-black/40">
                          Tasks
                        </span>
                      </div>

                      <p className="mt-1.5 text-base font-bold">
                        {tasks}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-medium text-black/40">
                        Completion
                      </span>

                      <span className="text-[9px] font-bold">
                        {progress}%
                      </span>
                    </div>

                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-black/[0.07]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${progress}%`,
                        }}
                        transition={{
                          duration: 0.7,
                          delay: 0.15 + index * 0.04,
                        }}
                        className="h-full rounded-full bg-black"
                      />
                    </div>
                  </div>

                  <div className="mt-auto flex shrink-0 items-center justify-between border-t border-black/10 pt-3">
                    <div className="flex min-w-0 items-center gap-1.5 text-[8px] text-black/35">
                      <CalendarDays
                        size={11}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        {formatDate(
                          workspace.createdAt ||
                            workspace.created
                        )}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/owner-workspace/${workspace._id}`
                        )
                      }
                      className="flex shrink-0 items-center gap-1.5 text-[9px] font-bold transition group-hover:gap-2.5"
                    >
                      Open
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && filteredWorkspaces.length === 0 && (
          <div className="mt-4 rounded-2xl border border-dashed border-black/15 bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
              <Search size={16} />
            </div>

            <h3 className="mt-4 text-sm font-bold">
              No workspace found
            </h3>

            <p className="mt-1.5 text-[10px] text-black/40">
              {search
                ? "Try searching with another workspace name."
                : "Create your first workspace to get started."}
            </p>

            {!search && (
              <button
                onClick={() => setShowCreate(true)}
                className="mx-auto mt-5 flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-[10px] font-semibold text-white"
              >
                <Plus size={13} />
                Create Workspace
              </button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showCreate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreate(false)}
              className="fixed inset-0 z-50 bg-black/40 p-3 backdrop-blur-sm"
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
              className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-24px)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                    New Workspace
                  </p>

                  <h2 className="mt-1.5 text-xl font-bold tracking-[-0.04em]">
                    Create workspace
                  </h2>

                  <p className="mt-1.5 text-[10px] leading-4 text-black/40">
                    Create a workspace and start building your
                    team.
                  </p>
                </div>

                <button
                  onClick={() => setShowCreate(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/10"
                >
                  <X size={14} />
                </button>
              </div>

              <form
                onSubmit={createWorkspace}
                className="mt-6"
              >
                <div>
                  <label className="text-[10px] font-semibold">
                    Workspace name
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. Product Development"
                    className="mt-1.5 h-10 w-full rounded-lg border border-black/10 px-3 text-[10px] outline-none transition focus:border-black"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-[10px] font-semibold">
                    Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value,
                      })
                    }
                    placeholder="What is this workspace for?"
                    rows={4}
                    className="mt-1.5 w-full resize-none rounded-lg border border-black/10 p-3 text-[10px] outline-none transition focus:border-black"
                  />
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="flex-1 rounded-lg border border-black/10 py-3 text-[10px] font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black py-3 text-[10px] font-semibold text-white transition active:scale-[0.98]"
                  >
                    <Plus size={13} />
                    Create Workspace
                  </button>
                </div>
              </form>
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
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-black/10 bg-white p-4"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
        <Icon size={16} />
      </div>

      <p className="mt-5 text-[10px] text-black/40">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>
    </motion.div>
  );
};

const WorkspaceSkeleton = () => {
  return (
    <div className="h-[300px] animate-pulse rounded-2xl border border-black/10 bg-white p-4">
      <div className="h-10 w-10 rounded-xl bg-black/10" />

      <div className="mt-5 h-4 w-40 rounded bg-black/10" />

      <div className="mt-2 h-3 w-full rounded bg-black/5" />

      <div className="mt-1 h-3 w-3/4 rounded bg-black/5" />

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="h-16 rounded-xl bg-black/5" />
        <div className="h-16 rounded-xl bg-black/5" />
      </div>

      <div className="mt-4 h-1 rounded bg-black/10" />

      <div className="mt-6 h-3 w-24 rounded bg-black/5" />
    </div>
  );
};

export default OwnerWorkspaces;