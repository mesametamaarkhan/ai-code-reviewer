"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type LanguageChartData = { language: string; count: number };
type ProjectChartData = { project: string; count: number };
type ScoreChartData = { range: string; count: number };

interface Props {
  languageData: LanguageChartData[];
  projectData: ProjectChartData[];
  scoreData: ScoreChartData[];
}

const tooltipStyle = {
  backgroundColor: "#0d121e",
  border: "1px solid rgba(148,163,184,0.1)",
  borderRadius: "0.75rem",
  color: "#e8ecf1",
  fontSize: "12px",
};

export default function DashboardCharts({ languageData, projectData, scoreData }: Props) {
  return (
    <div className="space-y-4">
      <Chart title="Reviews by Language" data={languageData} dataKey="language" />
      <Chart title="Reviews per Project" data={projectData} dataKey="project" />
      <Chart title="Score Distribution" data={scoreData} dataKey="range" />
    </div>
  );
}

function Chart({ title, data, dataKey }: { title: string; data: { count: number }[]; dataKey: string }) {
  return (
    <div className="surface">
      <h3 className="mb-5 text-sm font-semibold text-white">{title}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" vertical={false} />
            <XAxis
              dataKey={dataKey}
              tick={{ fill: "#8896ab", fontSize: 11 }}
              axisLine={{ stroke: "rgba(148,163,184,0.08)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#8896ab", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgba(16,185,129,0.04)" }}
            />
            <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
