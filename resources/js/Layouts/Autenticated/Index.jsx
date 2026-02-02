import { useState } from "react";
import Sidebar from "@/Layouts/Autenticated/Sidebar.jsx";
import TopBar from "@/Layouts/Autenticated/Topbar.jsx";

export default function Autenticaated({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        if (window.innerWidth >= 1024) {
            setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
        } else {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    return (
        <>
            <div className="mx-auto max-w-screen min-h-screen bg-[#0a0a0a] text-white font-sans">
                {/* Sidebar */}
               <Sidebar isSidebarOpen={isSidebarOpen} isDesktopSidebarOpen={isDesktopSidebarOpen} />

                {/* Mobile Overlay */}
                <div
                    className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    onClick={() => setIsSidebarOpen(false)}
                ></div>

                {/* Content */}
                  <div className={`transition-all duration-300 ${isDesktopSidebarOpen ? 'lg:ml-[300px]' : 'lg:ml-0'}`}>
                    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
    

                        {/* TopBar */}
                       <TopBar toggleSidebar={toggleSidebar} />

                        <main className="flex flex-col gap-6 -mt-4">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>

    );
}