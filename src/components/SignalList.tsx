
import { FC } from "react";
import { Signal } from "@/types/signal";
import { SignalCard } from "./SignalCard";

interface SignalListProps {
  signals: Signal[];
  onPlay: (name: string) => void;
  onSave: (name: string) => void;
  onEdit: (signal: Signal) => void;
}

export const SignalList: FC<SignalListProps> = ({
  signals,
  onPlay,
  onSave,
  onEdit,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {signals.map((signal) => (
        <SignalCard
          key={signal.id}
          {...signal}
          onPlay={() => onPlay(signal.name)}
          onSave={() => onSave(signal.name)}
          onEdit={() => onEdit(signal)}
        />
      ))}
    </div>
  );
};
