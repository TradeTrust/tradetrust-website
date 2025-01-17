import { format, toZonedTime } from "date-fns-tz";
import { enGB } from "date-fns/locale";

export const formatTime = (time: string, dateFormat: string, timeZoneSg = "Asia/Singapore"): string => {
  const dateTimeSg = toZonedTime(time, timeZoneSg);
  return format(dateTimeSg, dateFormat, { timeZone: timeZoneSg, locale: enGB });
};
