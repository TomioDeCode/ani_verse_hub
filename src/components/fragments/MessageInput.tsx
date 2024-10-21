import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  messageText: string;
  isConnected: boolean;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSendMessage: () => void;
}

export function MessageInput({
  messageText,
  isConnected,
  onMessageChange,
  onKeyPress,
  onSendMessage,
}: MessageInputProps) {
  return (
    <div className="flex-shrink-0 border-t p-4 -mb-5">
      <div className="flex items-center space-x-3">
        <Input
          value={messageText}
          onChange={onMessageChange}
          onKeyPress={onKeyPress}
          placeholder="Write your message..."
          className="flex-1 bg-transparent text-neutral-100 placeholder-neutral-500"
        />
        <Button
          onClick={onSendMessage}
          disabled={!isConnected || !messageText.trim()}
          className={`p-2 rounded-full ${
            isConnected && messageText.trim()
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
          }`}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}
