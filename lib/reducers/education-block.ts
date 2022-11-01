import { createSlice } from "@reduxjs/toolkit";
import { getMonth } from "../getMonth";
import { generateUid } from "../uuid";
import type { PayloadAction } from "@reduxjs/toolkit";

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

export const educationSlice = createSlice({
	name: "education",
	initialState,
	reducers: {
		addEducation: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.education.push({
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
			});
		},
		setEducationInfo: (state, action) => {
			/* let newArr = [...state.education]; */
			[...state.education].map((item) => {
				if (item.id === action.payload.educId) {
					if (action.payload.isCheckbox) {
						return (item[action.payload.field] =
							!item[action.payload.field]);
					}
					return (item[action.payload.field] = action.payload.value);
				}
			});
		},
		/*   decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }, */
	},
});

// Action creators are generated for each case reducer function
export const { addEducation, setEducationInfo } = educationSlice.actions;

export default educationSlice.reducer;

/* import { getMonth } from "../getMonth";
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
 */
