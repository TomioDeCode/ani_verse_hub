import { ChatMessage as ChatMessageType } from "@/store/atoms/atoms";
import { ChatMessage } from "./ChatMessage";

interface MessageListProps {
  messages: ChatMessageType[];
  formatTime: (timestamp: number | string) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({
  messages,
  formatTime,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="flex-grow overflow-y-auto">
      <div className="p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center text-neutral-500 py-8">
            Start a new conversation
          </div>
        ) : (
          messages.map((msg: ChatMessageType, index) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              showDivider={index < messages.length - 1}
              formatTime={formatTime}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
