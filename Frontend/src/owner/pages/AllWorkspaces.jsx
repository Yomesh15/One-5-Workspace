import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Plus,
  Search,
  MoreHorizontal,
  Users,
  ArrowRight,
  BriefcaseBusiness,
  Loader2,
  FolderOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import OwnerNavbar from "../components/OwnerNavbar";
import OwnerFooter from "../components/OwnerFooter";

const AllWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/owner/allworkspaces`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setWorkspaces(res.data.workspaces || []);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to fetch workspaces"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.title?.toLowerCase().includes(search.toLowerCase())
  );

  const openWorkspace = (id) => {
    navigate(`/owner-workspace/${id}`);
  };


  return (
    <>
      <OwnerNavbar />

      <div className="min-h-screen pt-1 bg-[#fafafa] text-black">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm text-black/50">
                  <BriefcaseBusiness size={16} />
                  <span>Workspaces</span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Your workspaces
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-black/50 sm:text-base">
                  Manage your teams, projects and work from one place.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/create-workspace")}
                className="flex w-fit items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                <Plus size={17} />
                Create Workspace
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="relative w-full sm:max-w-sm">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
              />

              <input
                type="text"
                placeholder="Search workspaces..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-xl border border-black/10 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30"
              />
            </div>

            {!loading && (
              <p className="text-sm text-black/40">
                {filteredWorkspaces.length}{" "}
                {filteredWorkspaces.length === 1 ? "workspace" : "workspaces"}
              </p>
            )}
          </motion.div>

          {loading ? (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-black/50">
                <Loader2 size={20} className="animate-spin" />
                Loading workspaces...
              </div>
            </div>
          ) : filteredWorkspaces.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 bg-white px-6 text-center"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
                <FolderOpen size={28} />
              </div>

              <h2 className="text-lg font-semibold">
                {search ? "No workspace found" : "No workspaces yet"}
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-black/45">
                {search
                  ? "Try searching with a different workspace name."
                  : "Create your first workspace and start managing your team."}
              </p>

              {!search && (
                <button
                  onClick={() => navigate("/create-workspace")}
                  className="mt-6 flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  <Plus size={17} />
                  Create Workspace
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence>
                {filteredWorkspaces.map((workspace, index) => (
                  <motion.div
                    key={workspace._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05,
                    }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white transition-shadow duration-300 hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)]"
                  >
                    <div className="p-6">
                      <div className="mb-6 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                          <BriefcaseBusiness size={21} />
                        </div>

                        {/* <button className="flex h-9 w-9 items-center justify-center rounded-lg text-black/40 transition hover:bg-black/5 hover:text-black">
                          <MoreHorizontal size={19} />
                        </button> */}
                      </div>

                      <h2 className="truncate text-xl font-semibold tracking-tight">
                        {workspace.title}
                      </h2>

                      <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-black/45">
                        {workspace.description || "No description available."}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
                        <div className="flex items-center gap-2 text-sm text-black/50">
                          <Users size={16} />
                          <span>
                            {workspace.members?.length || 0}{" "}
                            {workspace.members?.length === 1
                              ? "Member"
                              : "Members"}
                          </span>
                        </div>

                        <span className="text-xs text-black/35">
                          {workspace.createdAt
                            ? new Date(
                              workspace.createdAt
                            ).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => openWorkspace(workspace._id)}
                      className="flex w-full items-center justify-between border-t border-black/10 bg-black/[0.02] px-6 py-4 text-sm font-medium transition group-hover:bg-black group-hover:text-white"
                    >
                      <span>Open workspace</span>

                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <OwnerFooter />
    </>
  );
};

export default AllWorkspaces;