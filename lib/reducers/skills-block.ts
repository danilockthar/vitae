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
  skills: [oneSkill],
};

const skillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SKILL":
      return {
        skills: [
          ...state.skills,
          {
            id: generateUid("id_"),
            name: "",
            expertise: Expertise.EXPERT,
          },
        ],
      };
    case "EDIT_SKILL":
      let newArr = [...state.skills];
      newArr.map((item) => {
        if (item.id === action.payload.skillId) {
          return (item[action.payload.field] = action.payload.value);
        }
      });
      return {
        skills: [...newArr],
      };
    case "REMOVE_SKILL":
      return {
        skills: [
          ...state.skills.filter((item) => item.id !== action.payload.skillId),
        ],
      };
    default:
      return state;
  }
};

export default skillsReducer;
