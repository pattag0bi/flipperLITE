
import { useState } from "react";
import { Signal } from "@/types/signal";
import { useToast } from "@/hooks/use-toast";

export const useSignals = () => {
  const { toast } = useToast();
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

  const [editingSignal, setEditingSignal] = useState<Signal | null>(null);

  const handleSignalAction = (action: string, signalName: string) => {
    toast({
      title: `Signal ${action}`,
      description: `Successfully ${action.toLowerCase()} signal: ${signalName}`,
    });
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

  return {
    signals,
    editingSignal,
    setEditingSignal,
    handleSignalAction,
    handleEditSignal,
    handleSaveEdit,
  };
};
