"use client"

import Image from "next/image";
import Link from "next/link";
import { Home, Member, Loan, Author } from "@/components/ui/icons";
import { usePathname } from "next/navigation";
import UserTab from "./UserTab";

const SideBar = () => {
    const path = usePathname();

    const links = [
        {
            name: "Home",
            path: "/",
            icon: <Home color={path === "/" ? "white" : "#667085"} />
        },
        {
            name: "Members",
            path: "/members",
            icon: <Member color={path === "/members" ? "white" : "#667085"} />
        },
        {
            name: "Loans",
            path: "/loans",
            icon: <Loan color={path === "/loans" ? "white" : "#667085"} />
        },
        {
            name: "Authors",
            path: "/authors",
            icon: <Author color={path === "/authors" ? "white" : "#667085"} />
        },
    ];

    return (
        <div className="h-full pt-6 px-2 w-64 flex flex-col border-r border-slate-100 justify-between">
            <div>
                <div className="flex w-full items-center gap-6">
                    <Image src="/logo.png" alt="logo" width={60} height={60} />
                    <h1 className="text-2xl font-bold text-secondary font-ibm-plex-serif">EMILib</h1>
                </div>
                <ul className="flex flex-col gap-4 mt-8">
                    {links.map((link, index) => (
                        <Link href={link.path} key={index} className={`flex items-center gap-4 p-2 rounded cursor-pointer transition duration-300 text-slate-500 ${path === link.path && 'bg-primary text-white shadow-md'}`}>
                            {link.icon}
                            <span className="text-lg font-medium">{link.name}</span>
                        </Link>
                    ))}
                </ul>
            </div>
            <UserTab />
        </div>
    );
}

export default SideBar;
