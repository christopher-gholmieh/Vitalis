// Written by: Christopher Gholmieh
// Client:
"use client"

// Imports:

// Authentication:
import {
    signOut as sign_out
} from "next-auth/react";

// Lucide:
import {
    LayoutDashboardIcon,
    LucideLogOut
} from "lucide-react";


// Sidebar:
const Sidebar = () => {
    // Handler:
    const handler = async () => {
        await sign_out();
    }
    
    // Logic:
    return (
        /* Body: */
        <div className="w-64 h-screen bg-white shadow-md p-4 flex flex-col font-[Poppins] flex flex-col justify-between">
            {/* Avatar: */}
            <div>
                <div className="flex items-center space-x-2 pb-4 border-b">
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
            
                    <p>John Doe</p>
                </div>
        
            {/* Dashboard: */}
            <div className="text-gray-400 text-sm mt-4">Dashboard</div>
                <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2 cursor-pointer hover:bg-blue-600 duration-200 py-3 bg-blue-400 rounded-md px-4 text-white font-medium">
                        <LayoutDashboardIcon /> <span>Patients</span>
                    </li>
                </ul>
            </div>
        
            <div className="w-full my-4">
                {/* Authentication: */}
                <button className="flex items-center space-x-2 cursor-pointer hover:bg-blue-600 duration-200 py-3 bg-blue-400 rounded-md px-4 text-white font-medium gap-4 w-full" onClick={handler}>
                    <LucideLogOut /> Sign out
                </button>
            </div>
        </div>
    );
};

// Exports:
export default Sidebar;