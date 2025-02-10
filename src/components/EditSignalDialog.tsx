
import { FC } from "react";
import { Signal } from "@/types/signal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditSignalDialogProps {
  signal: Signal | null;
  onSignalChange: (signal: Signal) => void;
  onSave: () => void;
  onClose: () => void;
}

export const EditSignalDialog: FC<EditSignalDialogProps> = ({
  signal,
  onSignalChange,
  onSave,
  onClose,
}) => {
  if (!signal) return null;

  return (
    <Dialog open={!!signal} onOpenChange={() => onClose()}>
      <DialogContent className="bg-orange-900/95 border-orange-800 text-white">
        <DialogHeader>
          <DialogTitle>Edit Signal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Signal Name</Label>
            <Input
              id="name"
              value={signal.name}
              onChange={(e) =>
                onSignalChange({
                  ...signal,
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
              value={signal.frequency}
              onChange={(e) =>
                onSignalChange({
                  ...signal,
                  frequency: e.target.value,
                })
              }
              className="bg-black/40 border-orange-700"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-black/40 border-orange-700 hover:bg-orange-900/60"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
