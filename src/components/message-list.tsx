import { GetMessagesReturnType } from "@/features/messages/api/use-get-messages";
import { format, isToday, isYesterday } from "date-fns";
import { Message } from "./message";

interface MessageListProps {
  memberName?: string;
  mamberImsge?: string;
  channelName?: string;
  channelCreationTime?: number;
  variant?: "channel" | "thread" | "conversation";
  data: GetMessagesReturnType | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
}

const formateDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) {
    return "Today";
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
    return format(date, "EEEE, MMMM d");
};

export const MessageList = ({
  memberName,
  mamberImsge,
  channelName,
  channelCreationTime,
  variant = "channel",
  data,
  loadMore,
  isLoadingMore,
  canLoadMore,
}: MessageListProps) => {
  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, typeof data>
  );
  return (
    <div className="flex flex-col-reverse flex-1 overflow-y-auto pb-4 messages-scrollbar">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="text-center my-2 relative">
            <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm"> {formateDateLabel(dateKey)} </span>
          </div>
          {messages.map((message,index) =>{
            return (
                <Message
                    key={message._id}
                    id={message._id}
                    memberId={message.memberId}
                    authorImage={message.user.image}
                    authorName={message.user.name}
                    isAuthor={false}
                    reactions={message.reactions}
                    body={message.body}
                    image={message.image}
                    updatedAt={message.updatedAt}
                    createdAt={message._creationTime}
                    isEditing={false}
                    setEditingId={() => {}}
                    isCompact={false}
                    hideThreadButton={false}
                    threadCount={message.threadCount}
                    threadImage={message.threadImage}
                    threadTimestamp={message.threadTimestamp}
                    />
            )
          } )}
        </div>
      ))}
    </div>
  );
};
