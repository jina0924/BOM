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

function Graph({ part, isPC = true, data, filter }) {
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
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[0, 45]} />
                <Tooltip />
                <Legend verticalAlign="top" width="100%" />
                {filter.period !== "now" && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#EA5455"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                )}
                {filter.period !== "now" && (
                  <Line
                    type="monotone"
                    dataKey="최소"
                    stroke="#5C78B1"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                )}
                {filter.period === "now" && (
                  <Line
                    type="monotone"
                    dataKey="체온"
                    stroke="#5C78B1"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
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
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[0, 250]} />
                <Tooltip />
                {filter.period !== "now" && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#EA5455"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
                {filter.period !== "now" && (
                  <Line
                    type="monotone"
                    dataKey="최소"
                    stroke="#5C78B1"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                )}
                {filter.period === "now" && (
                  <Line
                    type="monotone"
                    dataKey="심박수"
                    stroke="#5C78B1"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
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
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[0, 100]} />
                <Tooltip />
                {filter.period !== "now" && (
                  <Line
                    type="monotone"
                    dataKey="최대"
                    stroke="#EA5455"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
                {filter.period !== "now" && (
                  <Line
                    type="monotone"
                    dataKey="최소"
                    stroke="#5C78B1"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                )}
                {filter.period === "now" && (
                  <Line
                    type="monotone"
                    dataKey="산소포화도"
                    stroke="#5C78B1"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
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
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="시간" fontSize={11} />
                <YAxis type="number" domain={[0, 4]} fontSize={11} />
                <Tooltip />
                <Legend verticalAlign="top" width="100%" />

                <Line
                  type="monotone"
                  dataKey="전압1"
                  stroke="#EA5455"
                  dot={{ r: 0 }}
                  activeDot={{ r: 4 }}
                />

                <Legend verticalAlign="top" width="100%" />

                <Line
                  type="monotone"
                  dataKey="전압2"
                  stroke="#5C78B1"
                  dot={{ r: 0 }}
                  activeDot={{ r: 4 }}
                />
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
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="시간" fontSize={11} />
                <YAxis type="number" domain={[-20, 80]} fontSize={11} />
                <Tooltip />
                {filter.period === "now" && (
                  <Line
                    type="monotone"
                    dataKey="온도"
                    stroke="#5C78B1"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                )}
                {filter.period !== "now" && (
                  <Line
                    type="monotone"
                    dataKey="최고"
                    stroke="#EA5455"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                )}

                <Legend verticalAlign="top" width="100%" />
              </LineChart>
            </ResponsiveContainer>
          )}
          {part === "입원환자추이" && (
            <ResponsiveContainer width="99%" height="90%">
              <LineChart
                data={data}
                margin={{
                  top: 0,
                  right: 50,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={11} />
                <YAxis type="number" fontSize={11} />
                <Tooltip />
                {!!data[0] && (
                  <Line
                    type="monotone"
                    dataKey="환자 수"
                    stroke="#5C78B1"
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                )}
                <Legend verticalAlign="top" width="100%" />
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
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[0, 45]} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="체온"
                  stroke="#5C78B1"
                  dot={{ r: 0 }}
                  activeDot={{ r: 4 }}
                />
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
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[0, 250]} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="심박수"
                  stroke="#5C78B1"
                  dot={{ r: 0 }}
                  activeDot={{ r: 4 }}
                />
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
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="시간" />
                <YAxis type="number" domain={[0, 100]} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="산소포화도"
                  stroke="#5C78B1"
                  dot={{ r: 0 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </>
  );
}

export default Graph;
