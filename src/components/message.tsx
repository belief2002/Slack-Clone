import dynamic from "next/dynamic";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { format, isToday, isYesterday } from "date-fns";
import { Hint } from "./hint";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Thumbnail } from "./thumbnail";
import { Toolbar } from "./toolbar";
import { useUpdateMessage } from "@/features/messages/api/use-update-message";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRemoveMessage } from "@/features/messages/api/use-remove-message";
import { useConfirm } from "@/hooks/use-confirm";
import { useToggleReaction } from "@/features/reactions/api/use-toggle-reaction";
import { Reactions } from "./Reactions";
import { usePanel } from "@/hooks/use-panel";
import { ThreadBar } from "./thread-bar";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface MessageProps {
  id: Id<"messages">;
  memberId: Id<"members">;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  reactions: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  body: Doc<"messages">["body"];
  image: string | null | undefined;
  createdAt: Doc<"messages">["_creationTime"];
  updatedAt: Doc<"messages">["updatedAt"];
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: Id<"messages"> | null) => void;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadName?: string;
  threadTimestamp?: number;
}

const formatFullTime = (date: Date) => {
  return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm a")}`;
};

export const Message = ({
  id,
  memberId,
  isAuthor,
  authorImage,
  authorName = "Member",
  reactions,
  body,
  image,
  createdAt,
  updatedAt,
  isEditing,
  isCompact,
  setEditingId,
  hideThreadButton,
  threadCount,
  threadImage,
  threadName,
  threadTimestamp,
}: MessageProps) => {
  const { parentMessageId, onOpenMessage, onOpenProfile, onClose } = usePanel();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete messaage?",
    "Are you sure you want to delete this message? This action cannot be undone."
  );
  const { mutate: updateMessage, isPending: isUpdatingMessage } =
    useUpdateMessage();
  const { mutate: removeMessage, isPending: isRemovingMessage } =
    useRemoveMessage();
  const { mutate: toggleReaction, isPending: isTogglingReaction } =
    useToggleReaction();

  const isPending = isUpdatingMessage || isTogglingReaction;

  const handleReaction = (value: string) => {
    toggleReaction(
      { messageId: id, value },
      {
        onError: () => {
          toast.error("Failed to add reaction");
        },
      }
    );
  };

  const handleRemove = async () => {
    const ok = await confirm();

    if (!ok) return;

    removeMessage(
      { id },
      {
        onSuccess: () => {
          toast.success("Message deleted successfully");
          if (parentMessageId === id) {
            onClose();
          }
        },
        onError: () => {
          toast.error("Failed to delete message");
        },
      }
    );
  };

  const handleUpdate = ({ body }: { body: string }) => {
    updateMessage(
      { id, body },
      {
        onSuccess: () => {
          toast.success("Message updated successfully");
          setEditingId(null);
        },
        onError: () => {
          toast.error("Failed to update message");
        },
      }
    );
  };

  if (isCompact) {
    return (
      <>
        <ConfirmDialog />
        <div
          className={cn(
            "flex flex-col gap-x-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
            isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433] ",
            isRemovingMessage &&
              "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
          )}
        >
          {isEditing ? (
            <div className="w-full h-full">
              <Editor
                onSubmit={handleUpdate}
                disabled={isPending}
                defaultValue={JSON.parse(body)}
                onCancel={() => setEditingId(null)}
                variant="update"
              />
            </div>
          ) : (
            <div className="flex text-xs flex-col items-start w-full pl-8 gap-x-2">
              <div className="flex gap-x-1 items-center">
                <Renderer value={body} />
                <Thumbnail url={image} />
                {updatedAt ? (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                ) : null}
                <Hint label={formatFullTime(new Date(createdAt))}>
                  <button className="text-xs opacity-0 text-muted-foreground group-hover:opacity-100 w-[60px] leading-[22px] text-center hover:underline">
                    {format(new Date(createdAt), "hh:mm a")}
                  </button>
                </Hint>
              </div>
              <Reactions data={reactions} onChange={handleReaction} />
              <ThreadBar
                count={threadCount}
                image={threadImage}
                timestamp={threadTimestamp}
                onclick={() => onOpenMessage(id)}
                name={threadName}
              />
            </div>
          )}
          {!isEditing && (
            <Toolbar
              isAuthor={isAuthor}
              isPending={false}
              handleEdit={() => setEditingId(id)}
              handleThread={() => onOpenMessage(id)}
              handleDelete={handleRemove}
              hideThreadButton={hideThreadButton}
              handleReaction={handleReaction}
            />
          )}
        </div>
      </>
    );
  }

  const avatarFallback = authorName.charAt(0).toUpperCase();

  return (
    <>
      <ConfirmDialog />
      <div
        className={cn(
          "flex flex-col gap-x-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
          isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433] ",
          isRemovingMessage &&
            "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
        )}
      >
        <div className="flex items-start gap-x-2">
          <button onClick={() => onOpenProfile(memberId)}>
            <Avatar className="size-5 mr-1">
              <AvatarImage src={authorImage} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </button>
          {isEditing ? (
            <div className="w-full h-full">
              <Editor
                onSubmit={handleUpdate}
                disabled={isPending}
                defaultValue={JSON.parse(body)}
                onCancel={() => setEditingId(null)}
                variant="update"
              />
            </div>
          ) : (
            <div className="flex flex-col overflow-hidden w-full">
              <div className="text-sm flex gap-x-1">
                <button
                  onClick={() => onOpenProfile(memberId)}
                  className="font-bold text-primary  hover:underline"
                >
                  {authorName}
                </button>
                <Hint label={formatFullTime(new Date(createdAt))}>
                  <button className="text-xs text-muted-foreground hover:underline">
                    {format(new Date(createdAt), "hh:mm a")}
                  </button>
                </Hint>
                {updatedAt ? (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                ) : null}
              </div>
              <Renderer value={body} />
              <Thumbnail url={image} />

              <Reactions data={reactions} onChange={handleReaction} />
              <ThreadBar
                count={threadCount}
                image={threadImage}
                timestamp={threadTimestamp}
                onclick={() => onOpenMessage(id)}
                name={threadName}
              />
            </div>
          )}
        </div>
        {!isEditing && (
          <Toolbar
            isAuthor={isAuthor}
            isPending={isPending}
            handleEdit={() => setEditingId(id)}
            handleThread={() => onOpenMessage(id)}
            handleDelete={handleRemove}
            hideThreadButton={hideThreadButton}
            handleReaction={handleReaction}
          />
        )}
      </div>
    </>
  );
};
