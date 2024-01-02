import { Dayjs } from "dayjs";

export function formatDate(inputDate: Dayjs | null): string {
  const jsDate = inputDate.toDate();

  if (jsDate.getFullYear()) {
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(jsDate);

    const formattedDateWithDots = formattedDate.replace(/\//g, ".");

    return formattedDateWithDots;
  }

  return "";
}

export const symbols = [
  {
    label: "KW",
  },
  {
    label: "KP",
  },
];
