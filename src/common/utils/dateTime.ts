import { format } from "date-fns";

export const formatTime = (time: string) => {
  return format(new Date(time), "HH:mm");
};
