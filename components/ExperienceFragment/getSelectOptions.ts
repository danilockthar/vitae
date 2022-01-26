export const getRangeYears = (top = 2021, min = 1930) => {
  let arr = [];
  for (let i = 0; i <= top; i++) {
    if (i >= min) {
      arr.push(i.toString());
    }
  }
  return arr;
};

export const getMonths = () => {
  return [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
};
