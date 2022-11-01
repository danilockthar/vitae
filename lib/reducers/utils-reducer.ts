import { createSlice } from "@reduxjs/toolkit";
import { StepsEnum } from "../interface";

export const initialState = {
	fullPreview: false,
	step: StepsEnum.INFORMATION,
	expand: false,
};

export const basicsSlice = createSlice({
	name: "basics",
	initialState,
	reducers: {
		setStep: (state, action) => {
			state.step = action.payload;
		},
		maxPreview: (state) => {
			state.fullPreview = true;
		},
		minPreview: (state) => {
			state.fullPreview = false;
		},
		expandSideMenu: (state) => {
			state.expand = !state.expand;
		},
		resizeMenu: (state) => {
			state.expand = false;
		},
	},
});

export const { setStep, maxPreview, minPreview, expandSideMenu, resizeMenu } =
	basicsSlice.actions;

export default basicsSlice.reducer;

/* import { createSlice } from "@reduxjs/toolkit";

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
 */
