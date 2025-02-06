import { useMemberId } from "@/hooks/use-member-id";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { Loader } from "lucide-react";
import { Header } from "./header";
import { ChatInput } from "./chat-input";
import { MessageList } from "@/components/message-list";

interface ConversationProps {
  id: Id<"conversations">;
}

export const Conversation = ({ id }: ConversationProps) => {
  const memebrId = useMemberId();
  const { data: member, isLoading: memberLoading } = useGetMember({
    id: memebrId,
  });
  const { results, status, loadMore } = useGetMessages({
    conversationId: id,
  });

  if (memberLoading || status === "LoadingFirstPage") {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
        <Header
            memberName={member?.user.name}
            memberImage={member?.user.image}
            onClick={()=>{}}
        />
        <MessageList
        data={results}
        variant="conversation"
        loadMore={loadMore}
        memberName={member?.user.name}
        memberImage={member?.user.image}
        isLoadingMore={status==="LoadingMore"}
        canLoadMore={status === "CanLoadMore"}

        />
        <ChatInput
          placeholder={`Message ${member?.user.name}`}
          conversationId={id}
        />
    </div>
  );
};
