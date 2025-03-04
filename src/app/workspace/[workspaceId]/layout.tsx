"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { usePanel } from "@/hooks/use-panel";
import { Loader, MenuIcon, XIcon } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Thread } from "@/features/messages/components/thread";
import { Profile } from "@/features/members/components/profile";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const { parentMessageId, profileMemberId, onClose } = usePanel();
  const [open, setOpen] = useState(true);
  const showPanel = !!parentMessageId || !!profileMemberId;
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <div className="sm:hidden w-auto flex flex-col ">
          <div
            className={cn(
              "bg-[#481349] py-2.5  text-white",
              !open && "w-[70px] flex items-center justify-center"
            )}
          >
            {open ? (
              <XIcon onClick={() => setOpen(!open)} className="size-7 ml-[1rem]" />
            ) : (
                <MenuIcon onClick={() => setOpen(!open)} className="size-7 " />
             
            )}
          </div>
          {open ? (
            <div className="flex h-full">
              <Sidebar />
              <WorkspaceSidebar />
            </div>
          ) : (
            <Sidebar />
          )}
        </div>
        <div className="max-sm:hidden">
          <Sidebar />
        </div>
        <ResizablePanelGroup
          autoSaveId="sc-workspace-layout"
          direction="horizontal"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={10}
            className="bg-[#5E2C5F] max-sm:hidden"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={10} defaultSize={80}>
            {children}
          </ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={10} defaultSize={30}>
                {parentMessageId ? (
                  <Thread
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : profileMemberId ? (
                  <Profile
                    memberId={profileMemberId as Id<"members">}
                    onClose={onClose}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
