import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND}/admin/login`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);

                navigate("/admin-home");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-5">

            <div className="w-full max-w-md">
 
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                        <ShieldCheck size={28} strokeWidth={1.8} />
                    </div>

                    <h1 className="text-3xl font-semibold tracking-tight text-black">
                        One 5 Workspace
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Administrator Portal
                    </p>
                </motion.div>


                
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm"
                >

                    <div className="mb-7">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Welcome back
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Sign in to manage One 5 Workspace.
                        </p>
                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="admin@one5workspace.com"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
                                />
                            </div>
                        </div>


                        
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-black focus:bg-white"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-black"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>


                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign in as Admin"}
                        </button>

                    </form>

                </motion.div>


                
                <p className="mt-6 text-center text-xs text-gray-400">
                    One 5 Workspace · Admin Access
                </p>

            </div>
        </div>
    );
};

export default AdminLogin;

