import { Button } from "@/components/ui/button";
import { useGetWorspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateWorkspaceModal();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorspace({
    id: workspaceId,
  });
  const { data: workspaces, isLoading: workspacesLoading } = useGetWorspaces();
  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace._id !== workspaceId
  );
  return (
    <div className="flex flex-col gap-y-2 ">
      <Button className="relative size-9 overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
        {workspaceLoading ? (
          <Loader className="size-5 animate-spin shrink-0" />
        ) : (
          workspace?.name.charAt(0).toUpperCase()
        )}
      </Button>

      {filteredWorkspaces?.map((workspace) => (
        <Button
          key={workspace._id}
          className="relative size-9 overflow-hidden hover:bg-white/80 bg-white text-black font-semibold text-xl"
          onClick={() => router.push(`/workspace/${workspace._id}`)}
        >
          {workspace.name.charAt(0).toUpperCase()}
        </Button>
      ))}
      <Button
        className="size-9 hover:bg-white/80 bg-white rounded-md flex items-center justify-center mr-2"
        onClick={() => setOpen(true)}
      >
        <Plus className="size-5 text-black shrink-0" />
      </Button>
    </div>
  );
};
