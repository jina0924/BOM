import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// data & style guide

// const data = [
//   {
//     name: "Page A",
//     최소: 40,
//     최대: 24,
//   },
//   {
//     name: "Page B",
//     최소: 30,
//     최대: 13,
//   },
//   {
//     name: "Page C",
//     최소: 20,
//     최대: 40,
//   },
//   {
//     name: "Page D",
//     최소: 27,
//     최대: 39,
//   },
//   {
//     name: "Page E",
//     최소: 18,
//     최대: 48,
//   },
//   {
//     name: "Page F",
//     최소: 23,
//     최대: 38,
//   },
//   {
//     name: "Page G",
//     최소: 34,
//     최대: 43,
//   },
// ];

function Graph({
  part,
  isPC,
  data = [
    {
      name: "2020-11-01",
      최소: 35.2,
      최대: 36.6,
    },
    {
      name: "2020-11-02",
      최소: 36.6,
      최대: 40.0,
    },
    {
      name: "2020-11-03",
      최소: 36.5,
      최대: 37.2,
    },
    {
      name: "2020-11-04",
      최소: 37,
      최대: 39,
    },
    {
      name: "2020-11-05",
      최소: 38,
      최대: 40.1,
    },
    {
      name: "2020-11-06",
      최소: 35,
      최대: 38,
    },
    {
      name: "2020-11-07",
      최소: 34,
      최대: 36,
    },
  ],
  style,
}) {
  return (
    <>
      {isPC && (
        <>
          {part == "체온" && (
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
                data={data}
                margin={{
                  top: 0,
                  right: 50,
                  // left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[30, 45]} />
                <Tooltip />
                <Legend verticalAlign="top" width="100%" />
                <Line
                  type="monotone"
                  dataKey="최대"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
          {part == "심박수" && (
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
                data={data}
                margin={{
                  top: 0,
                  right: 50,
                  // left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[70, 80]} />
                <Tooltip />
                <Legend verticalAlign="top" width="100%" />
                <Line
                  type="monotone"
                  dataKey="최대"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
          {part == "산소포화도" && (
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
                data={data}
                margin={{
                  top: 0,
                  right: 50,
                  // left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[30, 45]} />
                <Tooltip />
                <Legend verticalAlign="top" width="100%" />
                <Line
                  type="monotone"
                  dataKey="최대"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </>
      )}
      {!isPC && (
        <>
          {part == "체온" && (
            <ResponsiveContainer width="100%" height={150}>
              <LineChart
                data={data}
                margin={{
                  top: 0,
                  right: 50,
                  // left: 20,
                  // bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[30, 45]} />
                <Tooltip />
                <Legend verticalAlign="top" width="100%" />
                <Line
                  type="monotone"
                  dataKey="최대"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
          {part == "심박수" && (
            <ResponsiveContainer width="100%" height={150}>
              <LineChart
                data={data}
                margin={{
                  top: 0,
                  right: 50,
                  // left: 20,
                  // bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[70, 80]} />
                <Tooltip />
                <Legend verticalAlign="top" width="100%" />
                <Line
                  type="monotone"
                  dataKey="최대"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
          {part == "산소포화도" && (
            <ResponsiveContainer width="100%" height={150}>
              <LineChart
                data={data}
                margin={{
                  top: 0,
                  right: 50,
                  // left: 20,
                  // bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[30, 45]} />
                <Tooltip />
                <Legend verticalAlign="top" width="100%" />
                <Line
                  type="monotone"
                  dataKey="최대"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </>
  );
}

export default Graph;
