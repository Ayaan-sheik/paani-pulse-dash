// components/charts/HighFrequencyChart.tsx
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export interface DataPoint {
  hour: string;
  extraction: number;
  recharge: number;
}

interface HighFrequencyChartProps {
  fetchData?: () => Promise<DataPoint[]>; // Optional fetch function for production
  interval?: number; // update interval in ms
}

const HighFrequencyChart: React.FC<HighFrequencyChartProps> = ({ fetchData, interval = 60000 }) => {
  const [data, setData] = useState<DataPoint[]>([
    { hour: "01:00", extraction: 50, recharge: 30 },
    { hour: "02:00", extraction: 45, recharge: 25 },
    { hour: "03:00", extraction: 60, recharge: 40 },
    { hour: "04:00", extraction: 55, recharge: 35 },
  ]);

  // Fetch data initially or on interval
  useEffect(() => {
    const updateData = async () => {
      if (fetchData) {
        const newData = await fetchData();
        setData(newData);
      } else {
        // Mock update: shift and add random value
        const newHour = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const newPoint = {
          hour: newHour,
          extraction: Math.floor(Math.random() * 100),
          recharge: Math.floor(Math.random() * 50),
        };
        setData((prev) => [...prev.slice(-23), newPoint]); // keep last 24 hours
      }
    };

    const id = setInterval(updateData, interval);
    return () => clearInterval(id);
  }, [fetchData, interval]);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="extraction" fill="#3b82f6" />
          <Bar dataKey="recharge" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HighFrequencyChart;
