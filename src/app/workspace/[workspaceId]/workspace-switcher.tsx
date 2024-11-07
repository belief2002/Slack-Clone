import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWorspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorspace({
    id: workspaceId,
  });
  const { data: workspaces, isLoading: workspacesLoading } = useGetWorspaces();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="relative size-9 overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          A
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="w-64"
      ></DropdownMenuContent>
    </DropdownMenu>
  );
};
