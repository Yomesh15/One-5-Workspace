import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FolderKanban,
  Plus,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CreateWorkspace = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const addMember = () => {
    const id = memberInput.trim();

    if (!id) return;

    if (members.includes(id)) {
      toast.error("This member is already added");
      return;
    }

    setMembers((prev) => [...prev, id]);
    setMemberInput("");
  };

  const removeMember = (id) => {
    setMembers((prev) => prev.filter((member) => member !== id));
  };

  const handleMemberKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMember();
    }
  };

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Workspace title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Workspace description is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/owner/createworkspace`,
        {
          title: title.trim(),
          description: description.trim(),
          members,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Workspace created successfully");

        setTitle("");
        setDescription("");
        setMembers([]);

        navigate("/owner-workspace");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to create workspace"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white text-black">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">

        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/owner-workspace")}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-black/55 transition hover:text-black"
        >
          <ArrowLeft size={17} />
          Back to Workspaces
        </motion.button>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.06)] sm:p-8 lg:p-10"
          >
            <div className="mb-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                <FolderKanban size={22} />
              </div>

              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Create workspace
                </h1>

                <Sparkles
                  size={18}
                  className="text-black/35"
                />
              </div>

              <p className="mt-2 max-w-xl text-sm leading-6 text-black/50 sm:text-[15px]">
                Create a dedicated workspace for your team, organize
                projects, and collaborate in one place.
              </p>
            </div>

            <form onSubmit={handleCreateWorkspace}>

              <div className="space-y-7">

                <div>
                  <label className="mb-2.5 block text-sm font-medium">
                    Workspace name
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. One 5 Website"
                    maxLength={80}
                    className="h-13 w-full rounded-2xl border border-black/10 bg-black/[0.02] px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]"
                  />

                  <div className="mt-2 flex justify-end">
                    <span className="text-xs text-black/35">
                      {title.length}/80
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2.5 block text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What will your team work on in this workspace?"
                    rows={5}
                    maxLength={500}
                    className="w-full resize-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-4 text-sm leading-6 outline-none transition placeholder:text-black/30 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]"
                  />

                  <div className="mt-2 flex justify-end">
                    <span className="text-xs text-black/35">
                      {description.length}/500
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Add members
                    </label>

                    <span className="text-xs text-black/40">
                      {members.length}{" "}
                      {members.length === 1 ? "member" : "members"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Users
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
                      />

                      <input
                        type="text"
                        value={memberInput}
                        onChange={(e) => setMemberInput(e.target.value)}
                        onKeyDown={handleMemberKeyDown}
                        placeholder="Paste member ID"
                        className="h-13 w-full rounded-2xl border border-black/10 bg-black/[0.02] pl-11 pr-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]"
                      />
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={addMember}
                      className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-black text-white transition hover:bg-zinc-800"
                    >
                      <Plus size={20} />
                    </motion.button>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-black/40">
                    Members can find their ID on their profile and share it
                    with you.
                  </p>

                  <AnimatePresence mode="popLayout">
                    {members.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2 overflow-hidden"
                      >
                        {members.map((member, index) => (
                          <motion.div
                            key={member}
                            initial={{
                              opacity: 0,
                              x: -10,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            exit={{
                              opacity: 0,
                              x: 10,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="flex items-center justify-between rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                                {index + 1}
                              </div>

                              <p className="truncate font-mono text-xs text-black/65">
                                {member}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeMember(member)}
                              className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-black/35 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={15} />
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              <div className="mt-10 border-t border-black/10 pt-6">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create workspace
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="sticky top-8">

              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-black/35">
                <span>Preview</span>
              </div>

              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.06)]">

                <div className="border-b border-black/10 p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
                      <FolderKanban size={20} />
                    </div>

                    <div className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-medium text-black/50">
                      Workspace
                    </div>
                  </div>

                  <h2 className="truncate text-xl font-semibold tracking-tight">
                    {title || "Your workspace"}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-black/45">
                    {description ||
                      "Your workspace description will appear here."}
                  </p>
                </div>

                <div className="p-6">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-black/35">
                        Members
                      </p>

                      <p className="mt-1 text-2xl font-semibold">
                        {members.length}
                      </p>
                    </div>

                    <div className="flex -space-x-2">
                      {members.slice(0, 3).map((member, index) => (
                        <div
                          key={member}
                          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-black text-xs font-medium text-white"
                        >
                          {index + 1}
                        </div>
                      ))}

                      {members.length === 0 && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.03]">
                          <Users
                            size={15}
                            className="text-black/30"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-black/[0.03] p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white">
                        <Check size={14} />
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          Ready to collaborate
                        </p>

                        <p className="mt-1 text-xs leading-5 text-black/45">
                          Add your team members using their unique Member
                          IDs.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
                <p className="text-sm font-medium">
                  Tip
                </p>

                <p className="mt-1 text-xs leading-5 text-black/45">
                  Keep your workspace focused around one project or team.
                  You can manage members later.
                </p>
              </div>

            </div>
          </motion.aside>

        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;