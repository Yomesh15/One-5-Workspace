import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MemberLanding = () => {
    const navigate = useNavigate();

    const member = localStorage.getItem("owner")

    useEffect(() => {
        const timer = setTimeout(() => {
            if (member) {
                navigate("/owner-home");
            }
            else {
                navigate("/owner-login");
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);


    return (
        <div className="min-h-screen bg-[#111] text-white flex items-center justify-center overflow-hidden relative">


            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-white/[0.06] animate-[spin_20s_linear_infinite]" />

            <div className="absolute -bottom-52 -left-52 w-[650px] h-[650px] rounded-full border border-white/[0.05]" />

            <div className="absolute w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-3xl" />


            <div className="relative z-10 flex flex-col items-center text-center">


                <div className="relative mb-8">


                    <div className="absolute -inset-5 rounded-[2rem] border border-white/10 animate-ping [animation-duration:2s]" />


                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] bg-white text-black flex items-center justify-center shadow-2xl shadow-black/40 animate-[pulse_2s_ease-in-out_infinite]">

                        <span className="text-4xl sm:text-5xl font-bold">
                            5
                        </span>

                    </div>

                </div>


                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">

                    One 5

                </h1>


                <div className="mt-3 flex items-center gap-3">

                    <div className="w-8 h-px bg-zinc-700" />

                    <span className="font-sekuya text-lg sm:text-xl text-zinc-300">
                        Workspace
                    </span>

                    <div className="w-8 h-px bg-zinc-700" />

                </div>



                <p className="mt-8 text-sm sm:text-base text-zinc-500 tracking-wide">
                    Your work. Your team. One workspace.
                </p>


                <div className="mt-10 flex flex-col items-center gap-4">

                    <div className="w-32 h-[2px] bg-zinc-800 rounded-full overflow-hidden">

                        <div className="h-full bg-white rounded-full animate-[loading_3s_ease-in-out_forwards]" />

                    </div>

                    <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-600">
                        Entering workspace
                    </p>

                </div>

            </div>


            <div className="absolute bottom-8 left-0 right-0 text-center">

                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
                    Built for focused teams
                </p>

            </div>

            <style>
                {`
                    @keyframes loading {
                        0% {
                            width: 0%;
                        }

                        100% {
                            width: 100%;
                        }
                    }
                `}
            </style>

        </div>
    );
};

export default MemberLanding;