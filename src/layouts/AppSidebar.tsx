import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { UserIcon, ChartAreaIcon } from "lucide-react";
import finniLogo from "@/assets/finni-logo.png";
import { Link, useLocation } from "react-router-dom";


function AppSidebar() {
    const location = useLocation();

    const menuItems = [
        {
            icon: ChartAreaIcon,
            label: "Dashboard",
            path: "/dashboard"
        },
        {
            icon: UserIcon,
            label: "Patients", 
            path: "/patients"
        }
    ];

    return (
        <SidebarProvider className="w-80 h-full">
            <Sidebar className="h-full w-80 flex">
                <SidebarHeader>
                    <div className="h-10 w-full flex items-center justify-center">
                        <img src={finniLogo} alt="logo" className="h-full w-full object-contain" />
                    </div>
                </SidebarHeader>
                <SidebarContent className="mt-2">
                    <SidebarMenu>
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path || 
                                           (item.path === "/dashboard" && location.pathname === "/");
                            
                            return (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton 
                                        className={`h-10 cursor-pointer ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}
                                        asChild
                                    >
                                        <Link to={item.path}>
                                            <div className="w-full flex p-4 items-center gap-2">
                                                <item.icon size={24}/>
                                                <span className="ml-2 text-lg">{item.label}</span>
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}

export default AppSidebar;