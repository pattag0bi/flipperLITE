
import { FC } from "react";
import { cn } from "@/lib/utils";
import { WifiOff, Wifi } from "lucide-react";

interface ConnectionStatusProps {
  isConnected: boolean;
  deviceName?: string;
}

export const ConnectionStatus: FC<ConnectionStatusProps> = ({
  isConnected,
  deviceName = "ESP32 Device",
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-black/40 backdrop-blur-md border",
        isConnected
          ? "border-green-500/50 text-green-400"
          : "border-red-500/50 text-red-400"
      )}
    >
      {isConnected ? (
        <Wifi className="h-4 w-4 animate-pulse" />
      ) : (
        <WifiOff className="h-4 w-4" />
      )}
      <span className="text-sm font-medium">
        {isConnected ? `Connected to ${deviceName}` : "Disconnected"}
      </span>
    </div>
  );
};
