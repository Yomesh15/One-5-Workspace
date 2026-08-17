
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import OwnerNavbar from "../components/OwnerNavbar";
import OwnerFooter from "../components/OwnerFooter";

const OwnerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOwner = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/owner/currentowner`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setProfile(res.data.owner);
      } else {
        toast.error(
          res.data.message || "Unable to fetch owner information"
        );
      }
    } catch (error) {
      console.log("Current Owner Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to fetch owner information"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwner();
  }, []);

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "OW"
    );
  };

  const formatJoinedDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <OwnerNavbar />

        <main className="min-h-screen w-full bg-[#fafafa] px-3 pb-12 pt-8 text-black sm:px-5 sm:pt-10 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1050px]">
            <div className="animate-pulse">
              <div className="h-3 w-16 rounded bg-black/10" />

              <div className="mt-3 h-10 w-64 rounded-lg bg-black/10 sm:h-12 sm:w-80" />

              <div className="mt-3 h-4 w-72 rounded bg-black/5" />

              <div className="mt-7 overflow-hidden rounded-2xl border border-black/10 bg-white sm:rounded-3xl">
                <div className="p-5 sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-black/10 sm:h-24 sm:w-24" />

                    <div className="flex-1">
                      <div className="h-6 w-40 rounded bg-black/10" />
                      <div className="mt-3 h-3 w-52 rounded bg-black/5" />
                      <div className="mt-3 h-3 w-24 rounded bg-black/5" />
                    </div>
                  </div>

                  <div className="my-7 h-px bg-black/10" />

                  <div className="h-4 w-36 rounded bg-black/10" />

                  <div className="mt-5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
                    <div className="h-24 rounded-2xl bg-black/5" />
                    <div className="h-24 rounded-2xl bg-black/5" />
                    <div className="h-24 rounded-2xl bg-black/5" />
                    <div className="h-24 rounded-2xl bg-black/5" />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <div className="h-28 rounded-2xl bg-black/5" />
                <div className="h-28 rounded-2xl bg-black/5" />
                <div className="h-28 rounded-2xl bg-black/5" />
                <div className="h-28 rounded-2xl bg-black/5" />
              </div>

              <div className="mt-4 h-32 rounded-3xl bg-black/10" />
            </div>
          </div>
        </main>

        <OwnerFooter />
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <OwnerNavbar />

        <main className="flex min-h-[70vh] items-center justify-center bg-[#fafafa] px-5 text-black">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
              <User size={28} />
            </div>

            <h1 className="mt-5 text-xl font-bold">
              Owner information unavailable
            </h1>

            <p className="mt-2 text-sm text-black/45">
              We could not load your account information.
            </p>

            <button
              onClick={fetchOwner}
              className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
            >
              Try Again
            </button>
          </div>
        </main>

        <OwnerFooter />
      </>
    );
  }

  return (
    <>
      <OwnerNavbar />

      <main className="min-h-screen w-full overflow-x-hidden bg-[#fafafa] px-3 pb-12 pt-4 text-black sm:px-5 sm:pt-6 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1050px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 pt-4 sm:mb-7"
          >
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/35 sm:text-[10px]">
              Account
            </p>

            <h1 className="mt-1.5 break-words text-3xl font-black tracking-[-0.06em] sm:mt-2 sm:text-4xl md:text-5xl">
              Your profile.
            </h1>

            <p className="mt-1.5 max-w-lg text-[9px] leading-5 text-black/45 sm:mt-2 sm:text-xs">
              View your personal information and account details.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="overflow-hidden rounded-2xl border border-black/10 bg-white sm:rounded-3xl"
          >
            <div className="p-4 sm:p-7 md:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                  <div className="relative shrink-0">
                    {profile.photo ? (
                      <img
                        src={profile.photo}
                        alt={profile.fullname || "Owner"}
                        className="h-16 w-16 rounded-2xl object-cover shadow-lg sm:h-24 sm:w-24"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-lg font-black tracking-[-0.04em] text-white shadow-lg sm:h-24 sm:w-24 sm:text-2xl">
                        {getInitials(profile.fullname)}
                      </div>
                    )}

                    <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-black sm:bottom-1.5 sm:right-1.5 sm:h-3.5 sm:w-3.5 sm:border-[3px]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h2 className="max-w-full break-words text-lg font-black tracking-[-0.04em] sm:text-2xl">
                        {profile.fullname || "Owner"}
                      </h2>

                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-black px-2 py-1 text-[6px] font-bold text-white sm:px-2.5 sm:py-1 sm:text-[7px]">
                        <ShieldCheck size={8} />
                        {profile.role || "Owner"}
                      </span>
                    </div>

                    <p className="mt-1 break-all text-[8px] text-black/40 sm:mt-1.5 sm:text-[11px]">
                      {profile.email || "No email available"}
                    </p>

                    <div className="mt-1.5 flex items-center gap-1.5 text-[7px] font-medium text-black/40 sm:mt-2 sm:text-[8px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-black" />
                      Active account
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-5 h-px bg-black/10 sm:my-7" />

              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-black/30 sm:text-[9px]">
                  Personal Information
                </p>

                <h3 className="mt-1 text-sm font-bold tracking-[-0.02em]">
                  Account details
                </h3>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 sm:mt-5 sm:gap-3">
                <InfoCard
                  icon={User}
                  label="Full Name"
                  value={profile.fullname || "—"}
                />

                <InfoCard
                  icon={Mail}
                  label="Email Address"
                  value={profile.email || "—"}
                />

                <InfoCard
                  icon={Phone}
                  label="Phone Number"
                  value={profile.phone || "—"}
                />

                <InfoCard
                  icon={CalendarDays}
                  label="Joined"
                  value={formatJoinedDate(profile.createdAt)}
                />
              </div>
            </div>
          </motion.div>

          {/* <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
            <ProfileStat
              icon={BriefcaseBusiness}
              value={profile.workspaceCount ?? profile.workspaces?.length ?? "00"}
              label="Workspaces"
            />

            <ProfileStat
              icon={Users}
              value={profile.memberCount ?? "00"}
              label="Members"
            />

            <ProfileStat
              icon={CheckCircle2}
              value={profile.completedTasks ?? "00"}
              label="Completed Tasks"
            />

            <ProfileStat
              icon={Clock3}
              value={profile.pendingReviews ?? "00"}
              label="Pending Reviews"
            />
          </div> */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 rounded-2xl border border-black bg-black p-4 text-white sm:mt-4 sm:rounded-3xl sm:p-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black sm:h-10 sm:w-10">
                  <ShieldCheck size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/35 sm:text-[9px]">
                    Security
                  </p>

                  <h3 className="mt-1 text-sm font-bold">
                    Your account is secure
                  </h3>

                  <p className="mt-1 text-[8px] leading-4 text-white/40 sm:text-[9px]">
                    Keep your account information up to date.
                  </p>
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-[9px] font-semibold transition hover:bg-white/10 sm:w-auto">
                Manage Security
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <OwnerFooter />
    </>
  );
};

const InfoCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="min-w-0 rounded-xl border border-black/[0.08] bg-[#fafafa] p-3.5 transition hover:border-black/15 sm:rounded-2xl sm:p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black text-white">
          <Icon size={12} />
        </div>

        <p className="min-w-0 truncate text-[8px] font-medium text-black/35">
          {label}
        </p>
      </div>

      <p className="mt-2.5 truncate text-[9px] font-bold sm:mt-3 sm:text-[11px]">
        {value}
      </p>
    </div>
  );
};

const ProfileStat = ({ icon: Icon, value, label }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="min-w-0 rounded-xl border border-black/10 bg-white p-3.5 sm:rounded-2xl sm:p-5"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-white sm:h-8 sm:w-8">
        <Icon size={12} />
      </div>

      <p className="mt-3 text-lg font-black tracking-[-0.04em] sm:mt-4 sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 truncate text-[7px] text-black/40 sm:text-[9px]">
        {label}
      </p>
    </motion.div>
  );
};

export default OwnerProfile;
