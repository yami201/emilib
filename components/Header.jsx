"use server"
import { headers } from "next/headers";
const Header = () => {
    const headerList = headers()
    const user = JSON.parse(headerList.get('user'))
    const username = user.name;
    return ( 
        <div
            className="pb-4">
            <h1 className="text-3xl font-semibold font-inter">Welcome, 
                <span className="text-primary"> {username}</span>
            </h1>
            <p className="text-slate-500">Access & Manage your library effortlessly.</p>
        </div>
     );
}
 
export default Header;