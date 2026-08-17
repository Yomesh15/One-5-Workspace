import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Mail,
  Plus,
  Trash2,
  User,
  Users,
  X,
  Pencil,
  Save,
  Image,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OwnerFooter from "../components/OwnerFooter";
import OwnerNavbar from "../components/OwnerNavbar";

const ParticularWorkspace = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);

  const [memberId, setMemberId] = useState("");
  const [addingMember, setAddingMember] = useState(false);
  const [removingMember, setRemovingMember] = useState(null);
  const [deletingWorkspace, setDeletingWorkspace] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [updatingWorkspace, setUpdatingWorkspace] = useState(false);


  const [editData, setEditData] = useState({
    title: "",
    description: "",
    photo: "",
  });


  const fetchWorkspace = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/owner/particularworkspace/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setWorkspace(res.data.workspace);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to fetch workspace"
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchWorkspace();
  }, [id]);


  const openEditModal = () => {
    setEditData({
      title: workspace?.title || "",
      description: workspace?.description || "",
      photo: workspace?.photo || "",
    });

    setEditModal(true);
  };

  const closeEditModal = () => {
    if (!updatingWorkspace) {
      setEditModal(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateWorkspace = async (e) => {
    e.preventDefault();

    if (!editData.title.trim()) {
      toast.error("Workspace title is required");
      return;
    }

    if (!editData.description.trim()) {
      toast.error("Workspace description is required");
      return;
    }

    try {
      setUpdatingWorkspace(true);

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND}/owner/updateworkspace`,
        {
          id,
          title: editData.title.trim(),
          description: editData.description.trim(),
          photo: editData.photo.trim(),
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Workspace updated successfully");

        setWorkspace((prev) => ({
          ...prev,
          title: editData.title.trim(),
          description: editData.description.trim(),
          photo: editData.photo.trim(),
        }));

        setEditModal(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to update workspace"
      );
    } finally {
      setUpdatingWorkspace(false);
    }
  };

  const addMember = async () => {
    if (!memberId.trim()) {
      toast.error("Please enter member ID");
      return;
    }

    try {
      setAddingMember(true);

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND}/owner/addmember`,
        {
          memberid: memberId.trim(),
          id,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Member added successfully");
        setMemberId("");
        fetchWorkspace();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to add member"
      );
    } finally {
      setAddingMember(false);
    }
  };


  const removeMember = async (memberid) => {
    try {
      setRemovingMember(memberid);

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND}/owner/removemember`,
        {
          memberid,
          id,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Member removed successfully");
        fetchWorkspace();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to remove member"
      );
    } finally {
      setRemovingMember(null);
    }
  };

  const deleteWorkspace = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this workspace?"
    );


    if (!confirmed) return;

    try {
      setDeletingWorkspace(true);

      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND}/owner/deleteworkspace/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Workspace deleted successfully");
        navigate("/owner-workspaces");
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to delete workspace"
      );
    } finally {
      setDeletingWorkspace(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-white px-5 py-10">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-8 w-32 rounded-lg bg-black/10" />
          <div className="mt-8 h-72 rounded-3xl bg-black/5" />
          <div className="mt-6 h-40 rounded-3xl bg-black/5" />
        </div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-5">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
            <BriefcaseBusiness size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Workspace not found
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const members = workspace.members || [];


  return (
    <>
      <OwnerNavbar />

      <div className="min-h-screen bg-[#fafafa] text-black">
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="mb-7 flex items-center justify-between gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-black/60 transition hover:text-black"
            >
              <ArrowLeft size={17} />
              Back to Workspaces
            </button>

            <div className="flex items-center gap-3">
              
              <button
                onClick={() => navigate(`/create-task/${id}`)}
                className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                <Plus size={16} />
                Create Task
              </button>

              
              <button
                onClick={openEditModal}
                className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-black/5"
              >
                <Pencil size={15} />
                Edit Workspace
              </button>
            </div>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm"
          >
            <div className="relative h-56 overflow-hidden bg-black sm:h-72">
              {workspace.photo ? (
                <img
                  src={workspace.photo}
                  alt={workspace.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-black">
                  <BriefcaseBusiness
                    size={70}
                    strokeWidth={1}
                    className="text-white/60"
                  />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-5 sm:left-8 sm:right-8">
                <div className="min-w-0 text-white">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
                      <CheckCircle2 size={13} />
                      {workspace.status || "Active"}
                    </span>
                  </div>

                  <h1 className="truncate text-3xl font-bold tracking-tight sm:text-4xl">
                    {workspace.title}
                  </h1>
                </div>
              </div>
            </div>

            <div className="grid border-t border-black/10 sm:grid-cols-3">
              <div className="border-b border-black/10 p-6 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                    <Users size={20} />
                  </div>

                  <div>
                    <p className="text-2xl font-bold">
                      {members.length}
                    </p>

                    <p className="text-xs text-black/50">
                      Total Members
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-black/10 p-6 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-black/[0.03]">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {new Date(
                        workspace.createdAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <p className="text-xs text-black/50">
                      Created On
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                    <User size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {workspace.owner?.fullname ||
                        "Owner"}
                    </p>

                    <p className="text-xs text-black/50">
                      Workspace Owner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-[24px] border border-black/10 bg-white p-6 shadow-sm sm:p-7"
              >
                <div className="mb-5">
                  <h2 className="text-lg font-bold">
                    About Workspace
                  </h2>

                  <p className="mt-1 text-sm text-black/45">
                    Workspace information and
                    description
                  </p>
                </div>

                <p className="text-sm leading-7 text-black/65">
                  {workspace.description ||
                    "No description available."}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-[24px] border border-black/10 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-black/10 p-6 sm:p-7">
                  <div>
                    <h2 className="text-lg font-bold">
                      Workspace Members
                    </h2>

                    <p className="mt-1 text-sm text-black/45">
                      {members.length}{" "}
                      {members.length === 1
                        ? "member"
                        : "members"}{" "}
                      currently working here
                    </p>
                  </div>

                  <div className="flex h-10 min-w-10 items-center justify-center rounded-full bg-black px-3 text-sm font-bold text-white">
                    {members.length}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {members.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-black/15 px-5 py-12 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5">
                        <Users size={25} />
                      </div>

                      <h3 className="mt-4 font-semibold">
                        No members yet
                      </h3>

                      <p className="mt-1 text-sm text-black/45">
                        Add your first member to
                        this workspace.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {members.map(
                        (member, index) => (
                          <motion.div
                            key={member._id}
                            initial={{
                              opacity: 0,
                              x: -10,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay:
                                index *
                                0.04,
                            }}
                            className="group flex items-center justify-between rounded-2xl border border-black/5 p-3 transition hover:border-black/15 hover:bg-black/[0.02]"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              {member.photo ? (
                                <img
                                  src={
                                    member.photo
                                  }
                                  alt={
                                    member.fullname
                                  }
                                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                                />
                              ) : (
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                                  <User
                                    size={
                                      18
                                    }
                                  />
                                </div>
                              )}

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                  {
                                    member.fullname
                                  }
                                </p>

                                <p className="flex items-center gap-1 truncate text-xs text-black/45">
                                  <Mail
                                    size={
                                      12
                                    }
                                  />
                                  {
                                    member.email
                                  }
                                </p>

                                <p className="mt-0.5 truncate font-mono text-[10px] text-black/30">
                                  ID:{" "}
                                  {
                                    member._id
                                  }
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() =>
                                removeMember(
                                  member._id
                                )
                              }
                              disabled={
                                removingMember ===
                                member._id
                              }
                              className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-black/35 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                              title="Remove member"
                            >
                              {removingMember ===
                                member._id ? (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                              ) : (
                                <Trash2
                                  size={
                                    16
                                  }
                                />
                              )}
                            </button>
                          </motion.div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </motion.section>
            </div>

            <div className="space-y-6">
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-[24px] border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                    <Plus size={20} />
                  </div>

                  <h2 className="mt-4 text-lg font-bold">
                    Add Member
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-black/45">
                    Enter the member's unique ID to
                    add them to this workspace.
                  </p>
                </div>

                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/50">
                  Member ID
                </label>

                <input
                  type="text"
                  value={memberId}
                  onChange={(e) =>
                    setMemberId(e.target.value)
                  }
                  placeholder="Paste member ID"
                  className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-black focus:bg-white"
                />

                <button
                  onClick={addMember}
                  disabled={addingMember}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {addingMember ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Add Member
                    </>
                  )}
                </button>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-[24px] border border-black/10 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold">
                  Workspace Owner
                </h2>

                <div className="mt-5 flex items-center gap-3">
                  {workspace.owner?.photo ? (
                    <img
                      src={workspace.owner.photo}
                      alt={
                        workspace.owner.fullname
                      }
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                      <User size={19} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {
                        workspace.owner
                          ?.fullname
                      }
                    </p>

                    <p className="truncate text-xs text-black/45">
                      {workspace.owner?.email}
                    </p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-[24px] border border-red-100 bg-white p-6 shadow-sm"
              >
                <h2 className="text-sm font-bold text-red-600">
                  Danger Zone
                </h2>

                <p className="mt-2 text-xs leading-5 text-black/45">
                  Deleting this workspace is
                  permanent and cannot be undone.
                </p>

                <button
                  onClick={deleteWorkspace}
                  disabled={deletingWorkspace}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingWorkspace ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete Workspace
                    </>
                  )}
                </button>
              </motion.section>
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {editModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closeEditModal();
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
              }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold">
                    Edit Workspace
                  </h2>

                  <p className="mt-1 text-xs text-black/45">
                    Update your workspace information
                  </p>
                </div>

                <button
                  onClick={closeEditModal}
                  disabled={updatingWorkspace}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-black/40 transition hover:bg-black/5 hover:text-black disabled:opacity-40"
                >
                  <X size={19} />
                </button>
              </div>

              <form
                onSubmit={updateWorkspace}
                className="p-6"
              >
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/50">
                      Workspace Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleEditChange}
                      placeholder="Enter workspace title"
                      className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-black focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/50">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                      placeholder="Enter workspace description"
                      rows={5}
                      className="w-full resize-none rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-black/25 focus:border-black focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/50">
                      Photo URL
                    </label>

                    <div className="relative">
                      <Image
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                      />

                      <input
                        type="url"
                        name="photo"
                        value={editData.photo}
                        onChange={
                          handleEditChange
                        }
                        placeholder="https://example.com/image.jpg"
                        className="w-full rounded-xl border border-black/10 bg-black/[0.02] py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-black/25 focus:border-black focus:bg-white"
                      />
                    </div>
                  </div>

                  {editData.photo && (
                    <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/5">
                      <div className="relative h-40">
                        <img
                          src={editData.photo}
                          alt="Workspace preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium shadow-sm">
                            Image Preview
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    disabled={
                      updatingWorkspace
                    }
                    className="rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold text-black/60 transition hover:bg-black/5 hover:text-black disabled:opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updatingWorkspace}
                    className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {updatingWorkspace ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <OwnerFooter />
    </>
  );
};

export default ParticularWorkspace;