import { format, utcToZonedTime } from "date-fns-tz";

const timeZoneSg = "Asia/Singapore";

export const formatTime = (time: string) => {
  const dateTimeSg = utcToZonedTime(time, timeZoneSg);
  return format(dateTimeSg, "HH:mm", { timeZone: timeZoneSg });
};

export const getGmt = (time: string) => {
  const dateTimeSg = utcToZonedTime(time, timeZoneSg);
  return format(dateTimeSg, "zzz", { timeZone: timeZoneSg });
};
