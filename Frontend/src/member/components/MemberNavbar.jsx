import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  User,
  X,
  ListTodo,
  BriefcaseBusiness,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MemberNavbar = () => {
  const [member, setMember] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  const fetchMember = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/member/currentmember`,
        {
          withCredentials: true,
        }
      );

      console.log("Response : ",res);
      

      if (res.data.success) {
        setMember(res.data.member);
      } else {
        setMember(null);
      }
    } catch (error) {
      console.log("CURRENT MEMBER ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      setMember(null);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/member/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("member");

      setMember(null);
      setProfileOpen(false);
      setMenuOpen(false);

      toast.success("Logged out successfully");

      navigate("/member-login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to logout"
      );
    }
  };

  const navigateTo = (path) => {
    setProfileOpen(false);
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full border-b border-black/10 bg-white text-black"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <motion.button
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() =>
            navigateTo(member ? "/member-home" : "/")
          }
          className="text-xl font-bold tracking-[-0.05em] sm:text-2xl"
          style={{ fontFamily: "Sekuya, sans-serif" }}
        >
          One 5 Workspace
        </motion.button>

        {member && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.25,
            }}
            className="hidden items-center gap-8 md:flex"
          >
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigateTo("/member-home")}
              className="text-sm font-medium transition hover:text-black/50"
            >
              Dashboard
            </motion.button>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigateTo("/member-tasks")}
              className="text-sm font-medium transition hover:text-black/50"
            >
              Tasks
            </motion.button>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigateTo("/member-workspace")}
              className="text-sm font-medium transition hover:text-black/50"
            >
              Workspace
            </motion.button>
          </motion.div>
        )}

        <div className="hidden items-center md:flex">
          {member ? (
            <motion.div
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="relative"
              ref={profileRef}
            >
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  setProfileOpen((prev) => !prev)
                }
                className="flex cursor-pointer items-center gap-3 rounded-full border border-black/10 bg-black/[0.03] py-1.5 pl-1.5 pr-3 transition hover:bg-black/[0.06]"
              >
                {member?.photo ? (
                  <motion.img
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    src={member.photo}
                    alt={member.fullname}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <motion.div
                    animate={{
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
                  >
                    <User size={17} />
                  </motion.div>
                )}

                <div className="hidden text-left lg:block">
                  <p className="max-w-32 truncate text-sm font-semibold">
                    {member.fullname || "Member"}
                  </p>

                  <p className="max-w-32 truncate text-xs text-black/50">
                    {member.email || ""}
                  </p>
                </div>

                <motion.div
                  animate={{
                    rotate: profileOpen ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      y: -8,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute right-[-3px] top-[63px] z-50 w-64 origin-top-right overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-[0_15px_50px_rgba(0,0,0,0.12)]"
                  >
                    <div className="border-b border-black/10 px-3 py-3">
                      <p className="truncate text-sm font-semibold">
                        {member.fullname}
                      </p>

                      <p className="truncate text-xs text-black/50">
                        {member.email}
                      </p>
                    </div>

                    <div className="pt-2">
                      <motion.button
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          navigateTo("/member-profile")
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-black/5"
                      >
                        <User size={17} />
                        Profile
                      </motion.button>

                      <motion.button
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          navigateTo("/member-home")
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-black/5"
                      >
                        <LayoutDashboard size={17} />
                        Dashboard
                      </motion.button>

                      <motion.button
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={17} />
                        Logout
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="flex items-center gap-3"
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  navigateTo("/member-login")
                }
                className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition hover:bg-black/5"
              >
                {/* <LogIn size={16} /> */}
                Login
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  navigateTo("/member-register")
                }
                className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Get Started
              </motion.button>
            </motion.div>
          )}
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() =>
            setMenuOpen((prev) => !prev)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black hover:text-white md:hidden"
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={menuOpen ? "close" : "menu"}
              initial={{
                opacity: 0,
                rotate: -90,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: 90,
                scale: 0.7,
              }}
              transition={{
                duration: 0.18,
              }}
            >
              {menuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t border-black/10 bg-white md:hidden"
          >
            <div className="px-5 py-5">
              {member ? (
                <>
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="mb-5 flex items-center gap-3 border-b border-black/10 pb-5"
                  >
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.fullname}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                        <User size={19} />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {member.fullname || "Member"}
                      </p>

                      <p className="truncate text-xs text-black/50">
                        {member.email || ""}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.06,
                        },
                      },
                    }}
                    className="flex flex-col gap-1"
                  >
                    <motion.button
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: -10,
                        },
                        visible: {
                          opacity: 1,
                          x: 0,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        navigateTo("/member-home")
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-black/5"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </motion.button>

                    <motion.button
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: -10,
                        },
                        visible: {
                          opacity: 1,
                          x: 0,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        navigateTo("/member-tasks")
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-black/5"
                    >
                      <ListTodo size={18} />
                      Tasks
                    </motion.button>

                    <motion.button
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: -10,
                        },
                        visible: {
                          opacity: 1,
                          x: 0,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        navigateTo("/member-workspace")
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-black/5"
                    >
                      <BriefcaseBusiness size={18} />
                      Workspace
                    </motion.button>

                    <motion.button
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: -10,
                        },
                        visible: {
                          opacity: 1,
                          x: 0,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        navigateTo("/member-profile")
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-black/5"
                    >
                      <User size={18} />
                      Profile
                    </motion.button>

                    <motion.button
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: -10,
                        },
                        visible: {
                          opacity: 1,
                          x: 0,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </motion.button>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="flex flex-col gap-3"
                >
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      navigateTo("/member-login")
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-sm font-medium transition hover:bg-black/5"
                  >
                    <LogIn size={17} />
                    Login
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      navigateTo("/member-register")
                    }
                    className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default MemberNavbar;