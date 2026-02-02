import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function TopBar({ toggleSidebar }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="flex justify-between items-center w-full">
            {/* Left side: Hamburger and Search */}
            <div className="flex items-center gap-4">
                 <button className="text-white focus:outline-none" onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="bg-[#181818] text-white placeholder-gray-500 border border-transparent focus:border-alerange focus:ring-0 rounded-full pl-10 pr-4 py-3 w-full max-w-[200px] sm:max-w-[320px] transition-all"
                        placeholder="Search..."
                    />
                </div>
            </div>

            {/* Right side: User Info and Dropdown */}
            <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm font-medium hidden md:block">Welcome, <span className="text-white font-bold">{user?.name}</span></span>
                <div className="relative">
                    <div
                        className="outline outline-2 outline-[#262626] p-[2px] rounded-full w-[50px] h-[50px] dropdown-button cursor-pointer hover:outline-alerange transition-all"
                        onClick={() => setIsDropdownOpen(prev => !prev)}>
                        <img src={user?.avatar || "/images/avatar.png"} className="rounded-full object-cover w-full" alt="User Avatar"/>
                    </div>
                    <div
                        className={`bg-[#181818] border border-[#262626] rounded-2xl text-white font-medium gap-1 absolute z-[999] right-0 top-[60px] min-w-[200px] overflow-hidden shadow-xl ${isDropdownOpen ? 'flex flex-col' : 'hidden'}`}
                    >
                        <div className="p-4 border-b border-[#262626] md:hidden">
                            <p className="text-sm font-bold text-white">{user?.name}</p>
                            <p className="text-xs text-gray-400">Premium User</p>
                        </div>
                        <a href="#!" className="transition-all hover:bg-[#262626] p-4 text-sm text-gray-300 hover:text-white flex items-center gap-3">Profile</a>
                        <a href="#!" className="transition-all hover:bg-[#262626] p-4 text-sm text-gray-300 hover:text-white flex items-center gap-3">Settings</a>
                        <a href="/prototype/login" className="transition-all hover:bg-[#262626] p-4 text-sm text-red-500 hover:text-red-400 flex items-center gap-3">Sign Out</a>
                    </div>
                </div>
            </div>
        </div>
    )
}