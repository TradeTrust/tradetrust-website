import { format, parseISO } from "date-fns";

export const formatTime = (time: string) => {
  return format(parseISO(time), "HH:mm");
};
