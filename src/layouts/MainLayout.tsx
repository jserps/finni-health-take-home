import AppSidebar from "./AppSidebar";
import AppTopbar from "./AppTopbar";
import { Outlet } from "react-router-dom";

function MainLayout() {

    return (
        <div className="flex h-full w-full">
            <AppSidebar />
            <main className="flex-1 overflow-auto">
                <AppTopbar />
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;