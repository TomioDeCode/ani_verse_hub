import { MoreHorizontal } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/store/atoms/atoms";

interface ChatMessageProps {
  message: ChatMessageType;
  showDivider: boolean;
  formatTime: (timestamp: number | string) => string;
}

export function ChatMessage({
  message,
  showDivider,
  formatTime,
}: ChatMessageProps) {
  return (
    <div className="group">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-neutral-800 flex-shrink-0 flex items-center justify-center">
          <span className="text-xs text-neutral-400">
            {message.sender?.slice(0, 2)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-medium">
              User {message.sender?.slice(0, 4)}
            </span>
            <span className="text-sm text-neutral-500">·</span>
            <span className="text-sm text-neutral-500">
              {formatTime(message.timestamp)}
            </span>
          </div>
          <div className="mt-1 text-neutral-100">{message.text}</div>
          <div className="mt-2 flex items-center space-x-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-neutral-500 hover:text-neutral-300 text-sm flex items-center space-x-1">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
      {showDivider && (
        <div className="ml-4 mt-1 mb-1 w-[1px] h-4 bg-neutral-800" />
      )}
    </div>
  );
}
