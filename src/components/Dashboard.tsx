
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignalCard } from "./SignalCard";
import { ConnectionStatus } from "./ConnectionStatus";
import { Button } from "@/components/ui/button";
import { Wifi, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const mockSignals = [
    {
      id: 1,
      name: "Garage Door",
      frequency: "433.92 MHz",
      strength: 85,
      timestamp: "2024-03-19 14:30",
    },
    {
      id: 2,
      name: "Car Remote",
      frequency: "433.92 MHz",
      strength: 65,
      timestamp: "2024-03-19 14:25",
    },
    {
      id: 3,
      name: "Unknown Signal",
      frequency: "433.92 MHz",
      strength: 30,
      timestamp: "2024-03-19 14:20",
    },
  ];

  const handleConnect = () => {
    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Disconnected from device" : "Connected to ESP32",
      description: isConnected
        ? "The connection has been terminated"
        : "Successfully established connection",
    });
  };

  const handleSignalAction = (action: string, signalName: string) => {
    toast({
      title: `Signal ${action}`,
      description: `Successfully ${action.toLowerCase()} signal: ${signalName}`,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">FlipperLite</h1>
          <div className="flex gap-4">
            <ConnectionStatus isConnected={isConnected} />
            <Button
              variant="outline"
              className="bg-black/40 backdrop-blur-md border-slate-800"
              onClick={handleConnect}
            >
              <Wifi className="mr-2 h-4 w-4" />
              {isConnected ? "Disconnect" : "Connect Device"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {mockSignals.map((signal) => (
            <SignalCard
              key={signal.id}
              {...signal}
              onPlay={() => handleSignalAction("Played", signal.name)}
              onSave={() => handleSignalAction("Saved", signal.name)}
              onEdit={() => handleSignalAction("Edited", signal.name)}
            />
          ))}
        </div>

        <Button
          className="w-full py-8 bg-black/40 backdrop-blur-md border-slate-800 hover:border-slate-700 hover:bg-black/60"
          variant="outline"
          onClick={handleStartScanning}
        >
          <Search className="mr-2 h-5 w-5" />
          Start Scanning for Signals
        </Button>
      </div>
    </div>
  );
};
