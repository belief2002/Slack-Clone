import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SideBarButton } from "./sidebar-button";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
    // const pathname = usePathname()
  return (
    <aside className="w-[70px] h-full  flex  flex-col gap-y-4 items-center pt-[9px] pb-4 bg-[#481349]">
      <WorkspaceSwitcher />
      {/* <SideBarButton icon={Home} label="Home" isActive={pathname.includes("/workspace")}/>
      <SideBarButton icon={MessageSquare} label="DMs" />
      <SideBarButton icon={Bell} label="Activity" />
      <SideBarButton icon={MoreHorizontal} label="More" /> */}

      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
