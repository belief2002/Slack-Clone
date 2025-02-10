"use client";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

// interface WorkspaceIdPageProps {
//   params: {
//     workspaceId: string;
//   };
// }
const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();
  const {data: member, isLoading: memberLoading} = useCurrentMember({workspaceId})
  const { data: workspace, isLoading: workspaceLoading } = useGetWorspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]._id, [channels]);
  const isAdmin = useMemo(()=> member?.role === "admin",[member?.role]); 

  useEffect(() => {
    if (workspaceLoading || channelsLoading || memberLoading|| !member || !workspace) return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    channelId,
    workspaceLoading,
    channelsLoading,
    workspace,
    open,
    setOpen,
    router,
    workspaceId,
    member,
    memberLoading,
    isAdmin
  ]);

  if(channelsLoading || workspaceLoading || memberLoading) {
    return(
      <div className="flex flex-1 h-full items-center justify-center flex-col gap-2">
        <Loader className=" size-6 animate-spin text-muted-foreground"/>

      </div>
    )
  }
  if(!workspace || !member){
    return(
      <div className="flex flex-1 h-full items-center justify-center flex-col gap-2">
        <TriangleAlert className=" size-6 text-rose-600 text-muted-foreground"/>
        <p className="text-sm text-muted-foreground">Workspace not found</p>
      </div>
    )
  }

  return(
    <div className="flex flex-1 h-full items-center justify-center flex-col gap-2">
      <TriangleAlert className=" size-6 text-rose-600 text-muted-foreground"/>
      <p className="text-sm text-muted-foreground">No channel found.</p>
    </div>
  )};

export default WorkspaceIdPage;
