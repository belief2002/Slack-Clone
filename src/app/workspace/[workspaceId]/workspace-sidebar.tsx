import { useCurrentMember } from "@/features/members/use-current-member";
import { useGetWorspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader2 } from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorspace({
    id: workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex justify-center items-center flex-col h-full bg-[#5E2C5F]">
        <Loader2 className=" animate-spin size-5 text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex justify-center gap-y-2 items-center flex-col h-full bg-[#5E2C5F]">
        <AlertTriangle className=" animate-spin size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full bg-[#5E2C5F]">
        <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
    </div>
  );
};
