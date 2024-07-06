import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

function timeAgo(date) {
  const now = new Date();
  const givenDate = new Date(date);

  if (isNaN(givenDate.getTime())) {
    return "Fecha inválida";
  }

  const isPast = now > givenDate;

  const years = differenceInYears(now, givenDate);
  const months = differenceInMonths(now, givenDate) % 12;
  const days = differenceInDays(now, givenDate) % 30;
  const hours = differenceInHours(now, givenDate) % 24;
  const minutes = differenceInMinutes(now, givenDate) % 60;
  const seconds = differenceInSeconds(now, givenDate) % 60;

  const formatTimeUnit = (value, unitName) => {
    return value > 0 ? `${value} ${unitName}${value !== 1 ? "s" : ""}, ` : "";
  };

  const result = `${formatTimeUnit(years, "año")}${formatTimeUnit(
    months,
    "mes"
  )}${formatTimeUnit(days, "día")}${formatTimeUnit(
    hours,
    "hora"
  )}${formatTimeUnit(minutes, "minuto")}${formatTimeUnit(seconds, "segundo")}`;

  return `${isPast ? "Hace " : "Quedan "}${result.trim().replace(/,$/, "")}`;
}

export default timeAgo;
