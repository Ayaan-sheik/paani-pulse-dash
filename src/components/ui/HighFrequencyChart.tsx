import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export interface DataPoint {
  hour: string;
  extraction: number;
  recharge: number;
}

interface HighFrequencyChartProps {
  data?: DataPoint[];            // Pre-generated data
  fetchData?: () => Promise<DataPoint[]>; // Optional fetch function for production
  interval?: number;             // Update interval in ms
}

const HighFrequencyChart: React.FC<HighFrequencyChartProps> = ({ data: propData, fetchData, interval = 60000 }) => {
  const [data, setData] = useState<DataPoint[]>(propData || [
    { hour: "01:00", extraction: 50, recharge: 30 },
    { hour: "02:00", extraction: 45, recharge: 25 },
    { hour: "03:00", extraction: 60, recharge: 40 },
    { hour: "04:00", extraction: 55, recharge: 35 },
  ]);

  // Update chart when propData changes
  useEffect(() => {
    if (propData) setData(propData);
  }, [propData]);

  // Optional periodic fetch
  useEffect(() => {
    const updateData = async () => {
      if (fetchData) {
        const newData = await fetchData();
        setData(newData);
      } else if (!propData) {
        // Mock live update
        const newHour = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const newPoint = {
          hour: newHour,
          extraction: Math.floor(Math.random() * 100),
          recharge: Math.floor(Math.random() * 50),
        };
        setData((prev) => [...prev.slice(-23), newPoint]); // last 24 hours
      }
    };

    const id = setInterval(updateData, interval);
    return () => clearInterval(id);
  }, [fetchData, interval, propData]);

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
