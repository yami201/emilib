"use client"

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { ToastContainer } from "react-toast";
const RootLayout = ({children}) => {
    return ( 
        <main className="w-screen h-screen flex">
            <SideBar/>
            <main className="p-6 w-full h-full">
                <Header/>
                {children}
            </main>
            <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </main>
     );
}
 
export default RootLayout;