import { Logout } from "./ui/icons";

const UserTab = () => {
    return ( 
        <div className="flex items-center px-2 py-5 border-t border-slate-100">
            <div className="bg-red-100 rounded-full w-12 h-12"></div>
            <div className="ml-4">
                <h1 className="text-lg font-semibold">John Doe</h1>
                <p className="text-sm text-slate-300">Admin</p>
            </div>
            <button className="ml-auto">
                <Logout />
            </button>

        </div>
     );
}
 
export default UserTab;