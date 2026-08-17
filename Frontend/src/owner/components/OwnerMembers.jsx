import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  User,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OwnerTeam = () => {
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const fetchTeam = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/owner/team`,
        {
          withCredentials: true,
        }
      );
 

      if (response.data?.success) {
        setWorkspaces(
          Array.isArray(response.data.members)
            ? response.data.members
            : []
        );
      } else {
        setWorkspaces([]);
        toast.error(
          response.data?.message || "Failed to fetch team"
        );
      }
    } catch (error) {
      console.log("Team error:", error);

      setWorkspaces([]);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch team members"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const allMembers = useMemo(() => {
    const members = [];

    workspaces.forEach((workspace) => {
      if (!Array.isArray(workspace.members)) return;

      workspace.members.forEach((member) => {
        if (!member || !member._id) return;

        members.push({
          ...member,
          workspaceId: workspace._id,
          workspaceName: workspace.title,
          workspaceStatus: workspace.status,
        });
      });
    });

    return members;
  }, [workspaces]);

  const uniqueMembers = useMemo(() => {
    const memberMap = new Map();

    allMembers.forEach((member) => {
      const existingMember = memberMap.get(member._id);

      if (!existingMember) {
        memberMap.set(member._id, {
          ...member,
          workspaces: [
            {
              id: member.workspaceId,
              title: member.workspaceName,
              status: member.workspaceStatus,
            },
          ],
        });
      } else {
        const alreadyExists = existingMember.workspaces.some(
          (workspace) => workspace.id === member.workspaceId
        );

        if (!alreadyExists) {
          existingMember.workspaces.push({
            id: member.workspaceId,
            title: member.workspaceName,
            status: member.workspaceStatus,
          });
        }
      }
    });

    return Array.from(memberMap.values());
  }, [allMembers]);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return uniqueMembers;

    return uniqueMembers.filter((member) => {
      const workspaceNames =
        member.workspaces
          ?.map((workspace) => workspace.title)
          .join(" ") || "";

      return (
        member.fullname?.toLowerCase().includes(query) ||
        member.email?.toLowerCase().includes(query) ||
        member.phone?.toLowerCase().includes(query) ||
        member.role?.toLowerCase().includes(query) ||
        workspaceNames.toLowerCase().includes(query)
      );
    });
  }, [uniqueMembers, search]);

  const activeMembers = uniqueMembers.filter((member) => {
    if (member.status) {
      return (
        member.status.toLowerCase() === "active"
      );
    }

    if (typeof member.isActive === "boolean") {
      return member.isActive;
    }

    return true;
  }).length;

  const getInitials = (fullname = "Member") => {
    const words = fullname.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return words
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "Recently";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getMemberStatus = (member) => {
    if (member.status) {
      return member.status;
    }

    if (typeof member.isActive === "boolean") {
      return member.isActive ? "Active" : "Inactive";
    }

    return "Active";
  };

  const getWorkspaceNames = (member) => {
    if (!Array.isArray(member.workspaces)) {
      return [];
    }

    return member.workspaces
      .map((workspace) => workspace.title)
      .filter(Boolean);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-3 pb-10 text-black sm:px-5 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1250px]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 pt-2 sm:pt-4"
        >
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35 sm:text-[10px]">
              Team Management
            </p>

            <h1 className="mt-2 break-words text-3xl font-black tracking-[-0.06em] sm:text-4xl md:text-5xl">
              Your team.
            </h1>

            <p className="mt-2 max-w-xl text-[11px] leading-5 text-black/45 sm:text-xs">
              Manage your workspace members, view their information
              and keep your team organized.
            </p>
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3">
          <StatCard
            icon={Users}
            title="Total Members"
            value={uniqueMembers.length}
            description="Unique team members"
            dark
          />

          <StatCard
            icon={CheckCircle2}
            title="Active Members"
            value={activeMembers}
            description="Currently active"
          />

          <StatCard
            icon={BriefcaseBusiness}
            title="Workspaces"
            value={workspaces.length}
            description="Your workspaces"
            className="col-span-2 sm:col-span-1"
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-[-0.03em] sm:text-xl">
              Team members
            </h2>

            <p className="mt-1 text-[9px] text-black/40 sm:text-[10px]">
              {filteredMembers.length} member
              {filteredMembers.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search member..."
              className="h-11 w-full rounded-xl border border-black/10 bg-white pl-10 pr-4 text-[11px] outline-none transition placeholder:text-black/30 focus:border-black/30"
            />
          </div>
        </div>

        {loading && (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-black/10 bg-white p-4 sm:p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 shrink-0 rounded-full bg-black/10" />

                  <div className="min-w-0 flex-1">
                    <div className="h-3 w-28 rounded bg-black/10" />
                    <div className="mt-2 h-2.5 w-20 rounded bg-black/5" />
                  </div>
                </div>

                <div className="mt-5 h-10 rounded-xl bg-black/5" />
                <div className="mt-3 h-10 rounded-xl bg-black/5" />
                <div className="mt-3 h-10 rounded-xl bg-black/5" />
                <div className="mt-4 h-9 rounded-xl bg-black/5" />
              </div>
            ))}
          </div>
        )}

        {!loading && filteredMembers.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredMembers.map((member, index) => {
              const memberStatus = getMemberStatus(member);

              const isActive =
                memberStatus.toLowerCase() === "active";

              const workspaceNames =
                getWorkspaceNames(member);

              return (
                <motion.div
                  key={member._id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                  }}
                  className="group relative min-w-0 overflow-visible rounded-2xl border border-black/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)] sm:p-5"
                >
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black text-[10px] font-bold text-white sm:h-12 sm:w-12">
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt={member.fullname || "Member"}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                              e.currentTarget.parentElement.innerText =
                                getInitials(member.fullname);
                            }}
                          />
                        ) : (
                          getInitials(member.fullname)
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold tracking-[-0.02em] sm:text-[15px]">
                          {member.fullname ||
                            "Unknown Member"}
                        </h3>

                        <p className="mt-1 truncate text-[9px] text-black/40">
                          {member.role ||
                            "Workspace Member"}
                        </p>
                      </div>
                    </div>

                    <div className="relative shrink-0">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === member._id
                              ? null
                              : member._id
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 transition hover:bg-black/[0.04]"
                      >
                        <MoreHorizontal size={14} />
                      </button>

                      <AnimatePresence>
                        {openMenu === member._id && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              scale: 0.95,
                              y: -5,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.95,
                              y: -5,
                            }}
                            className="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-xl border border-black/10 bg-white p-1 shadow-2xl"
                          >
                            {/* <button
                              onClick={() => {
                                setOpenMenu(null);
                                navigate(
                                  `/owner-member/${member._id}`
                                );
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[10px] font-semibold hover:bg-black/[0.04]"
                            >
                              <User size={13} />
                              View Profile
                            </button> */}

                            {member.workspaceId && (
                              <button
                                onClick={() => {
                                  setOpenMenu(null);
                                  navigate(
                                    `/owner-workspace/${member.workspaceId}`
                                  );
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[10px] font-semibold hover:bg-black/[0.04]"
                              >
                                <BriefcaseBusiness
                                  size={13}
                                />
                                View Workspace
                              </button>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-black/[0.035] p-3">
                    <div className="flex items-start gap-2">
                      <BriefcaseBusiness
                        size={12}
                        className="mt-0.5 shrink-0 text-black/40"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-black/30">
                          Workspace
                        </p>

                        {workspaceNames.length > 0 ? (
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {workspaceNames.map(
                              (name, workspaceIndex) => (
                                <span
                                  key={`${name}-${workspaceIndex}`}
                                  className="max-w-full truncate rounded-md bg-white px-2 py-1 text-[9px] font-semibold text-black/60"
                                >
                                  {name}
                                </span>
                              )
                            )}
                          </div>
                        ) : (
                          <p className="mt-1 text-[9px] text-black/40">
                            No workspace
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-black/[0.06] px-3 py-2.5">
                      <Mail
                        size={12}
                        className="shrink-0 text-black/35"
                      />

                      <span className="min-w-0 truncate text-[9px] text-black/50">
                        {member.email || "No email"}
                      </span>
                    </div>

                    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-black/[0.06] px-3 py-2.5">
                      <Phone
                        size={12}
                        className="shrink-0 text-black/35"
                      />

                      <span className="truncate text-[9px] text-black/50">
                        {member.phone || "No phone"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/[0.07] pt-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          isActive
                            ? "bg-black"
                            : "bg-black/20"
                        }`}
                      />

                      <span className="text-[8px] font-semibold text-black/40">
                        {memberStatus}
                      </span>
                    </div>

                    <span className="shrink-0 text-[8px] text-black/30">
                      Joined{" "}
                      {formatDate(member.createdAt)}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/owner-member/${member._id}`
                      )
                    }
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-black py-2.5 text-[9px] font-semibold text-white transition-all group-hover:gap-2.5"
                  >
                    View Member
                    <ArrowRight size={11} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && filteredMembers.length === 0 && (
          <div className="mt-5 rounded-2xl border border-dashed border-black/15 bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
              {search ? (
                <Search size={17} />
              ) : (
                <Users size={17} />
              )}
            </div>

            <h3 className="mt-4 text-sm font-bold">
              {search
                ? "No member found"
                : "No team members yet"}
            </h3>

            <p className="mx-auto mt-1.5 max-w-sm text-[10px] leading-4 text-black/40">
              {search
                ? "Try searching with another name, email, phone or workspace."
                : "Members added to your workspaces will appear here."}
            </p>
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
  className = "",
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={`min-w-0 rounded-2xl border p-4 sm:p-5 ${
        dark
          ? "border-black bg-black text-white"
          : "border-black/10 bg-white text-black"
      } ${className}`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
          dark
            ? "bg-white text-black"
            : "bg-black text-white"
        }`}
      >
        <Icon size={16} />
      </div>

      <p
        className={`mt-5 text-[9px] sm:text-[10px] ${
          dark ? "text-white/45" : "text-black/40"
        }`}
      >
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold sm:text-3xl">
        {value}
      </p>

      <p
        className={`mt-1.5 text-[8px] sm:text-[9px] ${
          dark ? "text-white/35" : "text-black/35"
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
};

export default OwnerTeam;