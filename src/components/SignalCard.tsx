
import { FC } from "react";
import { SignalStrengthIndicator } from "./SignalStrengthIndicator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Save, Edit2 } from "lucide-react";

interface SignalCardProps {
  name: string;
  frequency: string;
  strength: number;
  timestamp: string;
  onPlay: () => void;
  onSave: () => void;
  onEdit: () => void;
}

export const SignalCard: FC<SignalCardProps> = ({
  name,
  frequency,
  strength,
  timestamp,
  onPlay,
  onSave,
  onEdit,
}) => {
  return (
    <Card className="p-4 bg-black/40 backdrop-blur-md border-slate-800 hover:border-slate-700 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">{name}</h3>
          <p className="text-sm text-slate-400">{frequency}</p>
        </div>
        <SignalStrengthIndicator strength={strength} />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500">{timestamp}</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-green-400 hover:bg-green-400/10"
            onClick={onPlay}
          >
            <Play className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-blue-400 hover:bg-blue-400/10"
            onClick={onSave}
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-purple-400 hover:bg-purple-400/10"
            onClick={onEdit}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
