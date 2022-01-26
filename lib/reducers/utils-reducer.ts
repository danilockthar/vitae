import { StepsEnum } from "../interface";

export const initialState = {
  fullPreview: false,
  step: StepsEnum.INFORMATION,
  expand: false,
};

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MAX_PREVIEW":
      return {
        ...state,
        fullPreview: true,
      };
    case "MIN_PREVIEW":
      return {
        ...state,
        fullPreview: false,
      };
    case "SET_STEP":
      return {
        ...state,
        step: action.payload,
      };
    case "EXPAND_SIDE":
      return {
        ...state,
        expand: !state.expand,
      };
    default:
      return state;
  }
};

export default utilsReducer;
