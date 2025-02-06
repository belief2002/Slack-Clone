"use client";

import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-conversation";
import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Conversation } from "./conversation";

const MemberIdPage = () => {
  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);

  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  

  const { mutate, isPending } = useCreateOrGetConversation();
  useEffect(() => {
    mutate(
      {
        memberId,
        workspaceId,
      },
      {
        onSuccess(data) {
          setConversationId(data);
        },
        onError(e) {
          console.log({ e });

          toast.error("Could not create conversation.");
        },
      }
    );
  }, [mutate, workspaceId, memberId]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!conversationId) {
    return (
      <div className="flex justify-center gap-y-2 items-center flex-col h-full">
        <AlertTriangle className="size-6 text-rose-500" />
        <p className=" text-muted-foreground text-sm">Conversation not found</p>
      </div>
    );
  }
  return (
    <Conversation id={conversationId}/> 
  );
};

export default MemberIdPage;
