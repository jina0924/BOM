import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// data & style guide

// data = [
//   {
//     name: "날짜1",
//     uv: 38,
//     pv: 34,
//   },
//   {
//     name: "날짜2",
//     uv: 38,
//     pv: 34,
//   },
// ]

// style: {
//   domainDataMin: 'int',
//   domainDataMax: 'int',
//   dataKeyMin: 'str',
//   dataKeyMax: 'str',
//   dataKeyMinColor: 'str',
//   dataKeyMaxColor: 'str',
// }

function Graph({ data, style }) {
  <LineChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="1 1" />
    <XAxis dataKey="name" />
    <YAxis
      type="number"
      domain={[
        `dataMin - ${style.domainDataMin}`,
        `dataMax - ${style.domainDataMAX}`,
      ]}
    />
    <Tooltip />
    <Legend />
    <Line
      type="monotone"
      dataKey={style.dataKeyMin}
      stroke={style.dataKeyMinColor}
      activeDot={{ r: 8 }}
    />
    <Line
      type="monotone"
      dataKey={style.dataKeyMax}
      stroke={style.dataKeyMinColor}
    />
  </LineChart>;
}

export default Graph;
