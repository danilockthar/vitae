import { generateUid } from "../uuid";

export interface SkillDto {
  id: string;
  name: string;
  expertise: Expertise;
}

export enum Expertise {
  EXPERT = "experto",
  EXPERIENCED = "experimentado",
  SKILLFUL = "habil",
  BEGINNER = "principiante",
  NOVICE = "novato",
}

export interface Skills {
  skills: Array<SkillDto>;
}

const oneSkill = {
  id: generateUid("id_"),
  name: "",
  expertise: Expertise.EXPERT,
};

export const initialState = {
  languages: [oneSkill],
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LANGUAGE":
      return {
        languages: [
          ...state.languages,
          {
            id: generateUid("id_"),
            name: "",
            expertise: Expertise.EXPERT,
          },
        ],
      };
    case "EDIT_LANGUAGE":
      let newArr = [...state.languages];
      newArr.map((item) => {
        if (item.id === action.payload.skillId) {
          return (item[action.payload.field] = action.payload.value);
        }
      });
      return {
        skills: [...newArr],
      };
    case "REMOVE_LANGUAGE":
      return {
        skills: [
          ...state.languages.filter(
            (item) => item.id !== action.payload.skillId
          ),
        ],
      };
    default:
      return state;
  }
};

export default languageReducer;
