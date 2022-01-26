export const months = [
  {
    name: "Ene",
    pos: 0,
  },
  {
    name: "Feb",
    pos: 1,
  },
  {
    name: "Mar",
    pos: 2,
  },
  {
    name: "Abr",
    pos: 3,
  },
  {
    name: "May",
    pos: 4,
  },
  {
    name: "Jun",
    pos: 5,
  },
  {
    name: "Jul",
    pos: 6,
  },
  {
    name: "Ago",
    pos: 7,
  },
  {
    name: "Sep",
    pos: 8,
  },
  {
    name: "Oct",
    pos: 9,
  },
  {
    name: "Nov",
    pos: 10,
  },
  {
    name: "Dic",
    pos: 11,
  },
];

export const monthToString = (month: number) => {
  let monthStr = "";
  switch (month) {
    case 0:
      monthStr = "Ene";
      break;
    case 1:
      monthStr = "Feb";
      break;
    case 2:
      monthStr = "Mar";
      break;
    case 3:
      monthStr = "Abr";
      break;
    case 4:
      monthStr = "May";
      break;
    case 5:
      monthStr = "Jun";
      break;
    case 6:
      monthStr = "Jul";
      break;
    case 7:
      monthStr = "Ago";
      break;
    case 8:
      monthStr = "Sep";
      break;
    case 9:
      monthStr = "Oct";
      break;
    case 10:
      monthStr = "Nov";
      break;
    case 11:
      monthStr = "Dic";
      break;
    default:
      break;
  }
  return monthStr;
};
