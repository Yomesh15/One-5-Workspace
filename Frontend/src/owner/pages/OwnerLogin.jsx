import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OwnerLogin = () => {
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
        `${import.meta.env.VITE_BACKEND}/owner/login`,
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        setLoading(false);

        toast.success(res.data.message);

        localStorage.setItem(
          "owner",
          JSON.stringify(res.data.owner)
        );

        navigate("/owner-home");
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
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[2rem] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-zinc-200"
      >

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hidden lg:flex relative bg-[#111] text-white p-12 xl:p-16 overflow-hidden flex-col justify-between min-h-[700px]"
        >

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.4,
            }}
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full border border-white/10"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
            }}
            className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full border border-white/10"
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
            className="absolute top-20 right-20 w-32 h-32 rounded-full bg-white blur-2xl"
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
            className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-white blur-3xl"
          />

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
                className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-black font-bold text-lg"
              >
                5
              </motion.div>

              <span className="text-xl font-semibold tracking-tight">
                One 5
              </span>

            </div>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 max-w-lg"
          >

            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-6">
              Welcome back
            </p>

            <h1 className="text-5xl xl:text-6xl font-semibold leading-[1.05] tracking-tight">

              Work.
              <br />

              <span className="text-zinc-500">
                Assign.
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

            <p className="mt-8 text-zinc-400 text-base leading-7 max-w-md">
              Your workspace is waiting. Sign in and get back
              to the work that matters.
            </p>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 0.8,
            }}
            className="relative z-10 flex items-center justify-between text-xs text-zinc-500"
          >

            <span>
              One 5 Workspace
            </span>

            <span>
              © 2026
            </span>

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
              className="lg:hidden flex items-center justify-between mb-10"
            >

              <div className="flex items-center gap-3">

                <motion.div
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold"
                >
                  5
                </motion.div>

                <span className="font-semibold text-lg">
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

              <p className="text-sm text-zinc-500 mb-3">
                Good to see you
              </p>

              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">

                Welcome
                <br />

                <span className="font-sekuya">
                  back.
                </span>

              </h2>

              <p className="mt-4 text-sm text-zinc-500 leading-6">
                Sign in to your owner account and continue
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
                  className="w-full h-13 px-4 rounded-xl border border-zinc-200 bg-zinc-50/50 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
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

                  <div className="h-13 px-4 rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-100 flex items-center text-sm text-zinc-500">
                    +91
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="98765 43210"
                    className="w-full h-13 px-4 rounded-r-xl border border-zinc-200 bg-zinc-50/50 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
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
                    type="button"
                    onClick={() => navigate("/owner-forgot-password")}
                    className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
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
                  className="w-full h-13 px-4 rounded-xl border border-zinc-200 bg-zinc-50/50 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
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
                  className={`group w-full h-14 mt-2 rounded-xl text-white font-medium flex items-center justify-center gap-3 transition-all duration-300 ${loading
                    ? "cursor-not-allowed bg-zinc-800"
                    : "cursor-pointer bg-zinc-900 hover:bg-black hover:shadow-xl hover:shadow-zinc-900/15"
                    }`}
                >

                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                      <span>
                        Signing In...
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        Sign In
                      </span>

                      <motion.span
                        initial={{
                          x: 0,
                        }}
                        whileHover={{
                          x: 5,
                        }}
                        className="text-lg mt-[-2px]"
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
                  onClick={() => navigate("/owner-register")}
                  className="font-semibold text-zinc-900 cursor-pointer transition-opacity hover:opacity-60"
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
              className="mt-10 text-center text-[11px] text-zinc-400 leading-5"
            >

              By signing in, you agree to our{" "}

              <span className="text-zinc-600">
                Terms of Service
              </span>{" "}

              and{" "}

              <span className="text-zinc-600">
                Privacy Policy
              </span>.

            </motion.p>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default OwnerLogin;