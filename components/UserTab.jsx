"use server"

import { logout } from "@/lib/actions/user.actions";
import { Logout } from "./ui/icons";
import { headers } from "next/headers";

const UserTab = () => {
    const headerList = headers()
    const user = JSON.parse(headerList.get("user"))
    return ( 
        <div className="flex items-center px-2 py-5 border-t border-slate-100">
            <div className="ml-4">
                <h1 className="w-full text-primary font-semibold">{user.name}</h1>
                <p className="text-sm text-slate-500">{user.email}</p>
            </div>
            <form className="ml-auto" action={logout} >
                <button>
                    <Logout />
                </button>
            </form>

        </div>
     );
}
 
export default UserTab;