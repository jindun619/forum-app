//string date를 받아서 date:YYYY-MM-DD, time: hh-mm 반환
export function getDateByString(str: string) {
  const date = new Date(str);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return {
    date: date.toISOString().substring(0, 10),
    time: hours + ":" + minutes,
  };
}
