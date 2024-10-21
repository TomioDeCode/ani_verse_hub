"use client";
import { useRecoilValue } from "recoil";
import { useState, useEffect, useRef } from "react";
import { useSocketClient } from "@/hooks/useSocketClient";
import { chatMessagesState } from "@/store/atoms/atoms";
import { ChatHeader } from "@/components/common/ChatHeader";
import { MessageList } from "@/components/fragments/MessageList";
import { MessageInput } from "@/components/fragments/MessageInput";

export default function Chat() {
  const messages = useRecoilValue(chatMessagesState);
  const { sendMessage, isConnected } = useSocketClient();
  const [messageText, setMessageText] = useState("");
  const [chatName, setChatName] = useState("New Chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(messageText);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChangeName = () => {
    const newName = prompt("Enter new chat name:", chatName);
    if (newName?.trim()) {
      setChatName(newName.trim());
    }
  };

  const formatTime = (timestamp: number | string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto">
        <ChatHeader
          isConnected={isConnected}
          chatName={chatName}
          onChangeName={handleChangeName}
        />
        <MessageList
          messages={messages}
          formatTime={formatTime}
          messagesEndRef={messagesEndRef}
        />
      </div>
      <div className="fixed bottom-4 w-[78%]">
        <MessageInput
          messageText={messageText}
          isConnected={isConnected}
          onMessageChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
