
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Wifi, Search } from "lucide-react";
import { ConnectionStatus } from "./ConnectionStatus";
import { SignalList } from "./SignalList";
import { EditSignalDialog } from "./EditSignalDialog";
import { useSignals } from "@/hooks/useSignals";
import { useConnection } from "@/hooks/useConnection";

export const Dashboard: FC = () => {
  const {
    signals,
    editingSignal,
    setEditingSignal,
    handleSignalAction,
    handleEditSignal,
    handleSaveEdit,
  } = useSignals();
  
  const { isConnected, handleConnect, handleStartScanning } = useConnection();

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

        <SignalList
          signals={signals}
          onPlay={(name) => handleSignalAction("Played", name)}
          onSave={(name) => handleSignalAction("Saved", name)}
          onEdit={handleEditSignal}
        />

        <Button
          className="w-full py-8 bg-black/40 backdrop-blur-md border-orange-800 hover:border-orange-700 hover:bg-orange-900/60"
          variant="outline"
          onClick={handleStartScanning}
        >
          <Search className="mr-2 h-5 w-5" />
          Start Scanning for Signals
        </Button>

        <EditSignalDialog
          signal={editingSignal}
          onSignalChange={setEditingSignal}
          onSave={handleSaveEdit}
          onClose={() => setEditingSignal(null)}
        />
      </div>
    </div>
  );
};
