
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import UserTab from "@/components/UserTab";

const RootLayout = ({ children }) => {
    return (
        <main className="w-screen h-screen flex">
            <SideBar>
                <UserTab />
            </SideBar>
            <main className="p-6 w-full h-full">
                <Header/>
                {children}
            </main>
        </main>
    );
}

export default RootLayout;