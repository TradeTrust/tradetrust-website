import { Interaction as SchedulerInteraction } from "scheduler/tracing";
const profilingLogs: renderCallbackType[] = [];
const totalTime: { [key: string]: number } = {};

interface renderCallbackType {
  id: string;
  phase: "mount" | "update";
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<SchedulerInteraction>;
}

export const renderCallbackLogger = (
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
  interactions: Set<SchedulerInteraction>
  // id, // the "id" prop of the Profiler tree that has just committed
  // phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  // actualDuration, // time spent rendering the committed update
  // baseDuration, // estimated time to render the entire subtree without memoization
  // startTime, // when React began rendering this update
  // commitTime, // when React committed this update
  // interactions // the Set of interactions belonging to this update
): void => {
  // Aggregate or log render timings...

  const profilingData = {
    id: id,
    phase: phase,
    actualDuration: actualDuration,
    baseDuration: baseDuration,
    startTime: startTime,
    commitTime: commitTime,
    interactions: interactions,
    totalTime: updateTotalTime({ id: id, actualDuration: String(actualDuration) }),
  };

  // const currentTotal = updateTotalTime(profilingData)
  profilingLogs.push(profilingData as renderCallbackType);
  // if(id === 'CertificateViewerErrorBoundary' || id === 'CertificateViewerErrorBoundaryChildren' )
  // console.log(currentTotal)
  if (profilingData.actualDuration > 5) console.log(profilingData);
};

const updateTotalTime = (data: { [key: string]: string }): number => {
  if (typeof totalTime[data.id] === "undefined") {
    totalTime[data.id] = 0;
  }
  totalTime[data.id] = totalTime[data.id] + Number(data.actualDuration);
  return totalTime[data.id];
};
