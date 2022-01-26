import { getMonth } from "../getMonth";
import { generateUid } from "../uuid";

export interface EducationDto {
  id: string;
  institution: string;
  startYear: number;
  startMonth: number;
  stillHere: boolean;
  endYear: number;
  endMonth: number;
  city: string;
  country: string;
  grade: string;
  studyArea: string;
  website: string;
  description: string;
}

export interface Education {
  education: Array<EducationDto>;
}

const singleEducation: EducationDto = {
  id: generateUid("id_"),
  institution: "",
  startYear: 2021,
  startMonth: getMonth(),
  stillHere: true,
  endYear: 2021,
  endMonth: getMonth(),
  city: "",
  country: "",
  grade: "",
  studyArea: "",
  website: "",
  description: "",
};

export const initialState = {
  education: [singleEducation],
};

const educationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EDUCATION":
      return {
        education: [
          ...state.education,
          {
            id: generateUid("id_"),
            institution: "",
            startYear: 2021,
            startMonth: getMonth(),
            stillHere: true,
            endYear: 2021,
            endMonth: getMonth(),
            city: "",
            country: "",
            grade: "",
            studyArea: "",
            website: "",
            description: "",
          },
        ],
      };
    case "SET_EDUCATION_INFO":
      let newArr = [...state.education];
      newArr.map((item) => {
        if (item.id === action.payload.educId) {
          if (action.payload.isCheckbox) {
            return (item[action.payload.field] = !item[action.payload.field]);
          }
          return (item[action.payload.field] = action.payload.value);
        }
      });
      return {
        education: [...newArr],
      };
    default:
      return state;
  }
};

export default educationReducer;
