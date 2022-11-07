import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

function DonutGraph({ utilization }) {
  const COLORS = ["#FFB400", "#BFBFBF", "#FFBB28", "#FF8042"];

  const restBed = 100 - utilization;
  const data = [
    { name: "가동 중", value: 84 },
    { name: "잔여 병상", value: 16 },
    // { name: "가동 중", value: { utilization } },
    // { name: "잔여 병상", value: { restBed } },
  ];
  console.log(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          fill="#82ca9d"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default DonutGraph;
