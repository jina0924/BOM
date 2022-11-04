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
//     시간: "Page A",
//     최소: 40,
//     최대: 24,
//   },
//   {
//     시간: "Page B",
//     최소: 30,
//     최대: 13,
//   },
//   {
//     시간: "Page C",
//     최소: 20,
//     최대: 40,
//   },
//   {
//     시간: "Page D",
//     최소: 27,
//     최대: 39,
//   },
//   {
//     시간: "Page E",
//     최소: 18,
//     최대: 48,
//   },
//   {
//     시간: "Page F",
//     최소: 23,
//     최대: 38,
//   },
//   {
//     시간: "Page G",
//     최소: 34,
//     최대: 43,
//   },
// ];

function Graph({
  part,
  isPC = true,
  data = [
    {
      시간: "2020-11-01",
      최소: 35.2,
      최대: 36.6,
    },
    {
      시간: "2020-11-02",
      최소: 36.6,
      최대: 40.0,
    },
    {
      시간: "2020-11-03",
      최소: 36.5,
      최대: 37.2,
    },
    {
      시간: "2020-11-04",
      최소: 37,
      최대: 39,
    },
    {
      시간: "2020-11-05",
      최소: 38,
      최대: 40.1,
    },
    {
      시간: "2020-11-06",
      최소: 35,
      최대: 38,
    },
    {
      시간: "2020-11-07",
      최소: 34,
      최대: 36,
    },
    {
      시간: "2020-11-01",
      최소: 35.2,
      최대: 36.6,
    },
    {
      시간: "2020-11-02",
      최소: 36.6,
      최대: 40.0,
    },
    {
      시간: "2020-11-03",
      최소: 36.5,
      최대: 37.2,
    },
    {
      시간: "2020-11-04",
      최소: 37,
      최대: 39,
    },
    {
      시간: "2020-11-05",
      최소: 38,
      최대: 40.1,
    },
    {
      시간: "2020-11-06",
      최소: 35,
      최대: 38,
    },
    {
      시간: "2020-11-07",
      최소: 34,
      최대: 36,
    },
    {
      시간: "2020-11-01",
      최소: 35.2,
      최대: 36.6,
    },
    {
      시간: "2020-11-02",
      최소: 36.6,
      최대: 40.0,
    },
    {
      시간: "2020-11-03",
      최소: 36.5,
      최대: 37.2,
    },
    {
      시간: "2020-11-04",
      최소: 37,
      최대: 39,
    },
    {
      시간: "2020-11-05",
      최소: 38,
      최대: 40.1,
    },
    {
      시간: "2020-11-06",
      최소: 35,
      최대: 38,
    },
    {
      시간: "2020-11-07",
      최소: 34,
      최대: 36,
    },
    {
      시간: "2020-11-01",
      최소: 35.2,
      최대: 36.6,
    },
    {
      시간: "2020-11-02",
      최소: 36.6,
      최대: 40.0,
    },
    {
      시간: "2020-11-03",
      최소: 36.5,
      최대: 37.2,
    },
    {
      시간: "2020-11-04",
      최소: 37,
      최대: 39,
    },
    {
      시간: "2020-11-05",
      최소: 38,
      최대: 40.1,
    },
    {
      시간: "2020-11-06",
      최소: 35,
      최대: 38,
    },
    {
      시간: "2020-11-07",
      최소: 34,
      최대: 36,
    },
    {
      시간: "2020-11-01",
      최소: 35.2,
      최대: 36.6,
    },
    {
      시간: "2020-11-02",
      최소: 36.6,
      최대: 40.0,
    },
    {
      시간: "2020-11-03",
      최소: 36.5,
      최대: 37.2,
    },
    {
      시간: "2020-11-04",
      최소: 37,
      최대: 39,
    },
    {
      시간: "2020-11-05",
      최소: 38,
      최대: 40.1,
    },
    {
      시간: "2020-11-06",
      최소: 35,
      최대: 38,
    },
    {
      시간: "2020-11-07",
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
          {part === "체온" && (
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
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[30, 45]} />
                <Tooltip />
                <Legend verticalAlign="top" width="100%" />
                {!!data[0].최대 && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#8884d8"
                    activeDot={{ r: 4 }}
                  />
                )}
                {!!data[0].최소 && (
                  <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
                )}
                {!!data[0].실시간 && (
                  <Line type="monotone" dataKey="실시간" stroke="#82ca9d" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
          {part === "심박수" && (
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
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[20, 70]} />
                <Tooltip />
                {!!data[0].최대 && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#8884d8"
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
                {!!data[0].최소 && (
                  <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
                )}
                {!!data[0].실시간 && (
                  <Line type="monotone" dataKey="실시간" stroke="#82ca9d" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
          {part === "산소포화도" && (
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
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[80, 100]} />
                <Tooltip />
                {!!data[0].최대 && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#8884d8"
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
                {!!data[0].최소 && (
                  <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
                )}
                {!!data[0].실시간 && (
                  <Line type="monotone" dataKey="실시간" stroke="#82ca9d" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}

          {part === "전압" && (
            <ResponsiveContainer width="100%" height="100%">
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
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[0, 4]} />
                <Tooltip />
                {!!data[0].최대 && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#8884d8"
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
                {!!data[0].최소 && (
                  <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
                )}
                {!!data[0].실시간 && (
                  <Line type="monotone" dataKey="실시간" stroke="#82ca9d" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
          {part === "온도" && (
            <ResponsiveContainer width="100%" height="100%">
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
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[-20, 80]} />
                <Tooltip />
                {!!data[0].최대 && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#8884d8"
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
                {!!data[0].최소 && (
                  <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
                )}
                {!!data[0].실시간 && (
                  <Line type="monotone" dataKey="실시간" stroke="#82ca9d" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
          {part === "입원환자추이" && (
            <ResponsiveContainer width="100%" height="100%">
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
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[0, 100]} />
                <Tooltip />
                {!!data[0].최대 && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#8884d8"
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
                {!!data[0].최소 && (
                  <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
                )}
                {!!data[0].실시간 && (
                  <Line type="monotone" dataKey="실시간" stroke="#82ca9d" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </>
      )}
      {!isPC && (
        <>
          {part === "체온" && (
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
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[30, 45]} />
                <Tooltip />
                {!!data[0].최대 && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#8884d8"
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
                {!!data[0].최소 && (
                  <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
                )}
                {!!data[0].실시간 && (
                  <Line type="monotone" dataKey="실시간" stroke="#82ca9d" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
          {part === "심박수" && (
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
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[20, 100]} />
                <Tooltip />
                {!!data[0].최대 && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#8884d8"
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
                {!!data[0].최소 && (
                  <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
                )}
                {!!data[0].실시간 && (
                  <Line type="monotone" dataKey="실시간" stroke="#82ca9d" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
          {part === "산소포화도" && (
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
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[80, 100]} />
                <Tooltip />
                {!!data[0].최대 && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#8884d8"
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
                {!!data[0].최소 && (
                  <Line type="monotone" dataKey="최소" stroke="#82ca9d" />
                )}
                {!!data[0].실시간 && (
                  <Line type="monotone" dataKey="실시간" stroke="#82ca9d" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </>
  );
}

export default Graph;
