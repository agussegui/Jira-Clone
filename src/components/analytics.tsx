'use client';

import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import { AnalyticsCard } from "./analytics-card";
import { DottedSeparator } from "./dotted-sepator";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";


export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1 ">
          <AnalyticsCard
            title="Total de Tareas"
            value={data.taskCount}
            varient={data.taskDifference > 0 ? 'up' : 'down'}
            increaseValue={data.taskDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1 ">
          <AnalyticsCard
            title="Total Asignados"
            value={data.assignedTasksCount}
            varient={data.assignedTasksDifference > 0 ? 'up' : 'down'}
            increaseValue={data.assignedTasksDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1 ">
          <AnalyticsCard
            title="Total Completadas"
            value={data.completedTaskCount}
            varient={data.completedTaskDifference > 0 ? 'up' : 'down'}
            increaseValue={data.completedTaskDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>

        <div className="flex items-center flex-1 ">
          <AnalyticsCard
            title="Total Atrasados"
            value={data.overdueTaskCount}
            varient={data.overdueTaskDifference > 0 ? 'up' : 'down'}
            increaseValue={data.overdueTaskDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1 ">
          <AnalyticsCard
            title="Total Incompleto"
            value={data.incompleteTaskCount}
            varient={data.incompleteTaskDifference > 0 ? 'up' : 'down'}
            increaseValue={data.incompleteTaskDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};