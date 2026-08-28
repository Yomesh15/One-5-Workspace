import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";



const NotFound = () => {

    return (

        <div className="min-h-screen bg-white flex items-center justify-center px-6">

            <div className="text-center max-w-xl">

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
                        <SearchX size={38} className="text-gray-700" />
                    </div>
                </div>


                <h1 className="text-[100px] leading-none font-extrabold tracking-tight text-gray-900">
                    404
                </h1>


                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
                    Page Not Found
                </h2>


                <p className="text-gray-500 mt-4 text-base md:text-lg leading-relaxed">
                    Sorry, the page you aare looking for doesn't exist or may have
                    been moved. Please check the URL or return to your workspace.
                </p>


                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">

                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                         px-6 py-3 rounded-xl bg-black text-white font-medium
                         hover:bg-gray-800 transition-all duration-200"
                    >
                        <Home size={18} />
                        Back to Home

                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2
            px-6 py-3 rounded-xl border border-gray-200
            text-gray-700 font-medium hover:bg-gray-50
            transition-all duration-200"
                    >

                        <ArrowLeft size={18} />
                        Go Back
                    </button>

                </div>


                <div className="mt-12">
                    <p className="text-sm text-gray-400">
                        One 5 Workspace
                    </p>
                </div>

            </div>
        </div>
    );
};

export default NotFound;