export const getMonth = (): number => {
  let date = new Date();
  let month = date.getMonth();

  return month;
};
