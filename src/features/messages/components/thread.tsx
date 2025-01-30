import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { AlertTriangle, Loader, XIcon } from "lucide-react";
import { useGetMessage } from "../api/use-get-message";
import { Message } from "@/components/message";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/use-current-member";
import { useState } from "react";

interface ThreadProps {
  messageId: Id<"messages">;
  onClose: () => void;
}

export const Thread = ({ messageId, onClose }: ThreadProps) => {
  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);
  const workspaceId = useWorkspaceId();
  const { data: currentMember } = useCurrentMember({ workspaceId });
  const { data: messaage, isLoading: messageLoading } = useGetMessage({
    id: messageId,
  });
  if (messageLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between border-b px-2 h-[49px] items-center">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }
  if (!messaage) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between border-b px-2 h-[49px] items-center">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col gap-y-2 h-full items-center justify-center">
          <AlertTriangle className="size-5  text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Message not found.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between border-b px-2 h-[49px] items-center">
        <p className="text-lg font-bold">Thread</p>
        <Button onClick={onClose} size="iconSm" variant="ghost">
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div>
        <Message
          hideThreadButton
          id={messaage._id}
          body={messaage.body}
          image={messaage.image}
          authorName={messaage.user.name}
          authorImage={messaage.user.image}
          isAuthor={messaage.memberId === currentMember?._id}
          createdAt={messaage._creationTime}
          updatedAt={messaage.updatedAt}
          memberId={messaage.memberId}
          isEditing={editingId === messaage._id}
          setEditingId={setEditingId}
          reactions={messaage.reactions}
        />
      </div>
    </div>
  );
};
