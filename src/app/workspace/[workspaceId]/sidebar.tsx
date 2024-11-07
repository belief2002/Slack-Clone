import { UserButton } from "@/features/auth/components/user-button"
import { WorkspaceSwitcher } from "./workspace-switcher"

export const Sidebar = ()=>{
    return (
        <aside className="w-[70px] h-full flex flex-col gap-y-4 items-center pt-[9xp] pb-4 bg-[#481349]">
            <div>
                <WorkspaceSwitcher/>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton/>
            </div>
        </aside>
    )
}