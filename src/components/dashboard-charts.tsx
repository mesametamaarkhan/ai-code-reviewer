"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type LanguageChartData = {
  language: string;
  count: number;
};

type ProjectChartData = {
  project: string;
  count: number;
};

type ScoreChartData = {
  range: string;
  count: number;
};

interface Props {
  languageData: LanguageChartData[];
  projectData: ProjectChartData[];
  scoreData: ScoreChartData[];
}

export default function DashboardCharts({
  languageData,
  projectData,
  scoreData,
}: Props) {
  return (
    <div className="space-y-8">
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Reviews by Language</h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={languageData}>
              <XAxis dataKey="language" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Reviews per Project</h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectData}>
              <XAxis dataKey="project" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Score Distribution</h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreData}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
