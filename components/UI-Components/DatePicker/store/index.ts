import { useReducer } from "react";

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, [action.name]: action.payload };
    default:
      return state;
  }
};
export const initialState = {
  startMonth: 0,
  startYear: 2021,
  endMonth: 0,
  endYear: 2021,
  stillHere: false,
  showInit: false,
  showEnd: false,
  lastEvent: "startMonth",
};
