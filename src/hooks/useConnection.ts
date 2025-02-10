
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useConnection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Disconnected from device" : "Connected to ESP32",
      description: isConnected
        ? "The connection has been terminated"
        : "Successfully established connection",
    });
  };

  const handleStartScanning = () => {
    if (!isConnected) {
      toast({
        title: "Connection Required",
        description: "Please connect to a device before scanning for signals",
        variant: "destructive",
      });
      return;
    }
    navigate("/signal-graph");
  };

  return {
    isConnected,
    handleConnect,
    handleStartScanning,
  };
};
