import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MemberLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/member/login`,
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        setLoading(false);

        toast.success(res.data.message);

        localStorage.setItem(
          "member",
          JSON.stringify(res.data.member)
        );

        navigate("/member-home");

        window.scrollTo({top:0, behavior:"smooth"})
      }
    } catch (error) {
      setLoading(false);

      console.log(error);

      toast.error(
        error.response?.data?.message || "Internal Server Error"
      );
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const formVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4 py-8 text-zinc-900 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] lg:grid-cols-2"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative hidden min-h-[700px] flex-col justify-between overflow-hidden bg-[#111] p-12 text-white lg:flex xl:p-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/10"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full border border-white/10"
          />

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-20 top-20 h-32 w-32 rounded-full bg-white blur-2xl"
          />

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 left-20 h-40 w-40 rounded-full bg-white blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.35,
            }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{
                  rotate: 5,
                  scale: 1.05,
                }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-bold text-black"
              >
                5
              </motion.div>

              <span className="text-xl font-semibold tracking-tight">
                One 5
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 max-w-lg"
          >
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
              Welcome back
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight xl:text-6xl">
              Work.
              <br />

              <span className="text-zinc-500">
                Connect.
              </span>

              <br />

              <motion.span
                initial={{
                  opacity: 0,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.9,
                }}
                className="font-sekuya text-white"
              >
                Achieve.
              </motion.span>
            </h1>

            <p className="mt-8 max-w-md text-base leading-7 text-zinc-400">
              Your workspace is waiting. Sign in and get back
              to the work that matters.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
            }}
            className="relative z-10 flex items-center justify-between text-xs text-zinc-500"
          >
            <span>One 5 Workspace</span>
            <span>© 2026</span>
          </motion.div>
        </motion.div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
          <div className="w-full max-w-md">
            <motion.div
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="mb-10 flex items-center justify-between lg:hidden"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 font-bold text-white"
                >
                  5
                </motion.div>

                <span className="text-lg font-semibold">
                  One 5
                </span>
              </div>

              <span className="text-xs text-zinc-400">
                Workspace
              </span>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8"
            >
              <p className="mb-3 text-sm text-zinc-500">
                Good to see you
              </p>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Welcome
                <br />

                <span className="font-sekuya">
                  back.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-zinc-500">
                Sign in to your member account and continue
                working with your team.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              <motion.div
                variants={itemVariants}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-zinc-700">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="h-13 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <div className="h-px flex-1 bg-zinc-200" />

                <span className="text-[11px] uppercase tracking-widest text-zinc-400">
                  or
                </span>

                <div className="h-px flex-1 bg-zinc-200" />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-zinc-700">
                  Phone number
                </label>

                <div className="flex">
                  <div className="flex h-13 items-center rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-100 px-4 text-sm text-zinc-500">
                    +91
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="98765 43210"
                    className="h-13 w-full rounded-r-xl border border-zinc-200 bg-zinc-50/50 px-4 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  />
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-zinc-700">
                    Password
                  </label>

                  <button
                    onClick={() => navigate('/member-forgot-password')}
                    type="button"
                    className="text-xs text-zinc-400 transition-colors hover:text-zinc-900"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="h-13 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={
                    !loading
                      ? {
                        y: -2,
                      }
                      : {}
                  }
                  whileTap={
                    !loading
                      ? {
                        scale: 0.98,
                      }
                      : {}
                  }
                  className={`group mt-2 flex h-14 w-full items-center justify-center gap-3 rounded-xl font-medium text-white transition-all duration-300 ${loading
                      ? "cursor-not-allowed bg-zinc-800"
                      : "cursor-pointer bg-zinc-900 hover:bg-black hover:shadow-xl hover:shadow-zinc-900/15"
                    }`}
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>

                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="mt-[-2px] text-lg"
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.9,
              }}
              className="mt-7 text-center"
            >
              <p className="text-sm text-zinc-500">
                Don't have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/member-register")}
                  className="cursor-pointer font-semibold text-zinc-900 transition-opacity hover:opacity-60"
                >
                  Create account
                </button>
              </p>
            </motion.div>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 1,
              }}
              className="mt-10 text-center text-[11px] leading-5 text-zinc-400"
            >
              By signing in, you agree to our{" "}
              <span className="text-zinc-600">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-zinc-600">
                Privacy Policy
              </span>
              .
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberLogin;