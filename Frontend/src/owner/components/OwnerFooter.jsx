import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const OwnerFooter = () => {
  return (
    <footer className="border-t border-black/10 bg-white text-black">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-[-0.07em] sm:text-4xl"
              style={{ fontFamily: "Sekuya, sans-serif" }}
            >
              One 5
            </motion.h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-black/50">
              Manage your workspaces, organize your teams, assign tasks,
              and keep your entire workflow moving forward.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black hover:text-white"
            >
              <FaGithub size={17} />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black hover:text-white"
            >
              <FaLinkedinIn size={17} />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black hover:text-white"
            >
              <FaTwitter size={17} />
            </a>

            <button
              onClick={() => (window.location.href = "/owner-home")}
              className="ml-1 flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Dashboard
              <FiArrowUpRight size={17} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 text-xs text-black/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} One 5. All rights reserved.</p>

          <div className="flex gap-5">
            <button className="transition hover:text-black">
              Privacy
            </button>

            <button className="transition hover:text-black">
              Terms
            </button>

            <button className="transition hover:text-black">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default OwnerFooter;