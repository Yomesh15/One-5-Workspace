import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND;


  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API_URL}/member/forgotpassword`,
        { email }
      );

      if (data.success) {
        toast.success("OTP sent to your email");
        setStep(2);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };


  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      return toast.error("Enter a valid 6 digit OTP");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API_URL}/member/verifyotp`,
        {
          email,
          otp
        }
      );

      if (data.success) {
        toast.success("OTP Verified");
        setStep(3);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };


  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const { data } = await axios.patch(
        `${API_URL}/member/updatepassword`,
        {
          email,
          password
        }
      );

      if (data.success) {
        toast.success("Password changed successfully");

        setTimeout(() => {
          navigate("/member-login");
        }, 1000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md">


        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">


          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
              {step === 1 && (
                <Mail className="w-7 h-7 text-blue-600" />
              )}

              {step === 2 && (
                <ShieldCheck className="w-7 h-7 text-blue-600" />
              )}

              {step === 3 && (
                <Lock className="w-7 h-7 text-blue-600" />
              )}
            </div>
          </div>


          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-slate-900">
              {step === 1 && "Forgot Password?"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Create New Password"}
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              {step === 1 &&
                "Enter your email and we'll send you an OTP"}

              {step === 2 &&
                `Enter the 6 digit OTP sent to ${email}`}

              {step === 3 &&
                "Create a strong password for your account"}
            </p>
          </div>


          {step === 1 && (
            <form onSubmit={handleSendOTP}>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative mb-5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full border border-slate-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>

            </form>
          )}


          {step === 2 && (
            <form onSubmit={handleVerifyOTP}>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="000000"
                className="w-full border border-slate-300 rounded-xl py-3 px-4 text-center text-2xl tracking-[0.5em] font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full mt-3 text-sm text-slate-500 hover:text-blue-600"
              >
                Change Email
              </button>

            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleChangePassword}>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Password
              </label>

              <div className="relative mb-4">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  className="w-full border border-slate-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>

              <div className="relative mb-5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
                  className="w-full border border-slate-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading
                  ? "Changing Password..."
                  : "Change Password"}
              </button>

            </form>
          )}


          <button
            onClick={() => navigate("/member-login")}
            className="flex items-center justify-center gap-2 w-full mt-6 text-sm text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft size={16} />
            Back to Member Login
          </button>

        </div>


        <div className="flex justify-center items-center gap-2 mt-6">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`h-2 rounded-full transition-all ${item === step
                  ? "w-8 bg-blue-600"
                  : item < step
                    ? "w-2 bg-blue-400"
                    : "w-2 bg-slate-300"
                }`}
            />
          ))}

        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;