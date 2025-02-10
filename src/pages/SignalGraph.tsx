
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const generateMockSignalData = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    time: i,
    amplitude: Math.sin(i * 0.1) * Math.random() * 100,
  }));
};

const SignalGraph: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(true);
  const [signalData, setSignalData] = useState(generateMockSignalData());

  const handleSaveSignal = () => {
    toast({
      title: "Signal Saved",
      description: "The signal has been successfully saved to your library",
    });
    navigate("/");
  };

  const handleStopScanning = () => {
    setIsScanning(false);
    toast({
      title: "Scanning Stopped",
      description: "Signal scanning has been stopped",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            className="bg-black/40 backdrop-blur-md border-orange-800"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex gap-4">
            {isScanning ? (
              <Button
                variant="destructive"
                className="bg-red-500/80 hover:bg-red-600/80"
                onClick={handleStopScanning}
              >
                <StopCircle className="mr-2 h-4 w-4" />
                Stop Scanning
              </Button>
            ) : (
              <Button
                variant="outline"
                className="bg-black/40 backdrop-blur-md border-orange-800"
                onClick={handleSaveSignal}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Signal
              </Button>
            )}
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-orange-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Signal Scanner</h2>
          <div className="w-full overflow-x-auto">
            <LineChart
              width={1000}
              height={400}
              data={signalData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="time"
                stroke="#F97316"
                label={{ value: "Time", position: "bottom", fill: "#F97316" }}
              />
              <YAxis
                stroke="#F97316"
                label={{
                  value: "Amplitude",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#F97316",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #F97316",
                }}
              />
              <Line
                type="monotone"
                dataKey="amplitude"
                stroke="#F97316"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalGraph;
