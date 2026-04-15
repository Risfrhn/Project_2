"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";

export default function NavigasiDasboardVar1() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        // Safe access to localStorage in Client Side
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, []);

    // Menu Configuration (Sistem "Include")
    const menuItems: { name: string; href: Route; roles: string[] }[] = [
        { name: "Dashboard", href: "/page/admin_page/halaman_utama" as Route, roles: ["boss", "penghuni"] },
        { name: "Kontrakan", href: "/page/admin_page/kontrakan" as Route, roles: ["boss", "penghuni"] },
        { name: "Keuangan", href: "#" as Route, roles: ["boss", "penghuni"] },
        { name: "Keluhan", href: "#" as Route, roles: ["boss", "penghuni"] },
        { name: "CCTV", href: "#" as Route, roles: ["boss", "penghuni"] },
    ];

    // Filter menus based on role
    const filteredMenus = menuItems.filter(item =>
        role === "boss" ? item.roles.includes("boss") : item.roles.includes("penghuni")
    );

    return (
        <div className="navbar fixed bg-[#111A45] shadow-sm lg:px-16 px-10 z-40">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow-xl">
                        {filteredMenus.map((menu, index) => (
                            <li key={index}>
                                <Link href={menu.href} className="hover:bg-blue-100">{menu.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Logo Link to Dashboard */}
                <Link href={"/page/admin_page/halaman_utama" as Route} className="p-3 text-xl text-white font-bold hidden xl:block hover:opacity-80 transition-opacity">
                    3R.
                </Link>
                <div className="hidden lg:block">
                    <ul className="flex flex-row gap-3 text-[14px] font-thin text-white">
                        {filteredMenus.map((menu, index) => (
                            <li key={index}>
                                <Link
                                    href={menu.href}
                                    className="px-3 py-2 rounded-md opacity-75 hover:opacity-100 hover:bg-[#3955D9] transition-all"
                                >
                                    {menu.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="navbar-end gap-5">
                <button className="text-white hover:rotate-45 transition-transform duration-300">
                    <FontAwesomeIcon icon={faGear} className="h-4 opacity-75" />
                </button>
                <button className="text-white indicator">
                    <FontAwesomeIcon icon={faBell} className="h-4 opacity-75" />
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                </button>
                <div className="flex flex-row gap-2 items-center">
                    <div className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                            <img
                                alt="User Avatar"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white hidden md:block">
                            {role === "boss" ? "John Doe" : "Penghuni"}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium hidden md:block">
                            {role === "boss" ? "Boss Utama" : "User Member"}
                        </span>
                    </div>
                </div>
            </div >
        </div >
    );
}