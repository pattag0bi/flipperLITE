
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignalCard } from "./SignalCard";
import { ConnectionStatus } from "./ConnectionStatus";
import { Button } from "@/components/ui/button";
import { Wifi, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Signal {
  id: number;
  name: string;
  frequency: string;
  strength: number;
  timestamp: string;
}

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null);

  const [signals, setSignals] = useState<Signal[]>([
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
  ]);

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

  const handleEditSignal = (signal: Signal) => {
    setEditingSignal(signal);
  };

  const handleSaveEdit = () => {
    if (!editingSignal) return;

    setSignals((prevSignals) =>
      prevSignals.map((signal) =>
        signal.id === editingSignal.id ? editingSignal : signal
      )
    );

    toast({
      title: "Signal Updated",
      description: `Successfully updated signal: ${editingSignal.name}`,
    });

    setEditingSignal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">FlipperLite</h1>
          <div className="flex gap-4">
            <ConnectionStatus isConnected={isConnected} />
            <Button
              variant="outline"
              className="bg-black/40 backdrop-blur-md border-orange-800 hover:bg-orange-900/60"
              onClick={handleConnect}
            >
              <Wifi className="mr-2 h-4 w-4" />
              {isConnected ? "Disconnect" : "Connect Device"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {signals.map((signal) => (
            <SignalCard
              key={signal.id}
              {...signal}
              onPlay={() => handleSignalAction("Played", signal.name)}
              onSave={() => handleSignalAction("Saved", signal.name)}
              onEdit={() => handleEditSignal(signal)}
            />
          ))}
        </div>

        <Button
          className="w-full py-8 bg-black/40 backdrop-blur-md border-orange-800 hover:border-orange-700 hover:bg-orange-900/60"
          variant="outline"
          onClick={handleStartScanning}
        >
          <Search className="mr-2 h-5 w-5" />
          Start Scanning for Signals
        </Button>

        <Dialog open={!!editingSignal} onOpenChange={() => setEditingSignal(null)}>
          <DialogContent className="bg-orange-900/95 border-orange-800 text-white">
            <DialogHeader>
              <DialogTitle>Edit Signal</DialogTitle>
            </DialogHeader>
            {editingSignal && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Signal Name</Label>
                  <Input
                    id="name"
                    value={editingSignal.name}
                    onChange={(e) =>
                      setEditingSignal({
                        ...editingSignal,
                        name: e.target.value,
                      })
                    }
                    className="bg-black/40 border-orange-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Input
                    id="frequency"
                    value={editingSignal.frequency}
                    onChange={(e) =>
                      setEditingSignal({
                        ...editingSignal,
                        frequency: e.target.value,
                      })
                    }
                    className="bg-black/40 border-orange-700"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingSignal(null)}
                className="bg-black/40 border-orange-700 hover:bg-orange-900/60"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
