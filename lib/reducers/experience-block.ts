import { getMonth } from "../getMonth";
import { generateUid } from "../uuid";

export interface ExperienceDto {
  id: string;
  company: string;
  city: string;
  jobName: string;
  startMonth: number;
  startYear: number;
  stillHere: boolean;
  endMonth: number;
  endYear: number;
  jobDescription: string;
  website: string;
  country: string;
  companyDescription: string;
  accomplishes: string;
}

export interface Experiences {
  experiences: Array<ExperienceDto>;
}

const oneExperience: ExperienceDto = {
  id: generateUid("id_"),
  company: "",
  city: "",
  jobName: "",
  startMonth: getMonth(),
  startYear: 2021,
  stillHere: true,
  endMonth: getMonth(),
  endYear: 2021,
  jobDescription: "",
  website: "",
  country: "",
  companyDescription: "",
  accomplishes: "",
};

export const initialState = {
  experiences: [oneExperience],
};

const experienceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EXPERIENCE":
      return {
        experiences: [
          ...state.experiences,
          {
            id: generateUid("id_"),
            company: "",
            city: "",
            jobName: "",
            startMonth: getMonth(),
            startYear: 2021,
            stillHere: true,
            endMonth: getMonth(),
            endYear: 2021,
            jobDescription: "",
            website: "",
            country: "",
            companyDescription: "",
            accomplishes: "",
          },
        ],
      };
    case "SET_EXPERIENCE_INFO":
      let newArr = [...state.experiences];
      newArr.map((item) => {
        if (item.id === action.payload.expId) {
          if (action.payload.isCheckbox) {
            return (item[action.payload.field] = !item[action.payload.field]);
          }
          return (item[action.payload.field] = action.payload.value);
        }
      });
      return {
        experiences: [...newArr],
      };
    case "REMOVE_EXPERIENCE":
      return {
        experiences: [...state.experiences.filter(item => item.id !== action.payload.expId)]
      }
    default:
      return state;
  }
};

export default experienceReducer;
