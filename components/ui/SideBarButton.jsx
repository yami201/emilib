"use client"

import { useRouter } from "next/navigation";

const SideBarButton = ({ path, link, index }) => {
    const router = useRouter();
    const navigateTo = (newPath) => {
        router.push(newPath);
        path = newPath;
    }
    return (
        <button
            onClick={navigateTo.bind(null, link.path)}
            key={index} className={`flex items-center gap-4 p-2 rounded cursor-pointer transition duration-300 text-slate-500 ${path === link.path && 'bg-primary text-white shadow-md'}`}>
            {link.icon}
            <span className="text-lg font-medium">{link.name}</span>
        </button>
    );
}

export default SideBarButton;