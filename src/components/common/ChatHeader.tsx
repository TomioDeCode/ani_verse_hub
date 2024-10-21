interface ChatHeaderProps {
  isConnected: boolean;
  chatName?: string;
  onChangeName?: () => void;
}

export function ChatHeader({
  isConnected,
  chatName = "Chat",
  onChangeName,
}: ChatHeaderProps) {
  return (
    <div className="border-b border-neutral-800 p-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1
            className="text-xl text-white font-bold cursor-pointer hover:text-neutral-300"
            onClick={onChangeName}
          >
            {chatName}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          <span className="text-sm text-neutral-400">
            {isConnected ? "Live" : "Connecting..."}
          </span>
        </div>
      </div>
    </div>
  );
}
