import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Template } from "./interface";
import reducers, { initialState } from "./reducers";

import { configureStore } from "@reduxjs/toolkit";
import informationReducer from "./reducers/information-block";
import experienceReducer from "./reducers/experience-block";
import educationReducer from "./reducers/education-block";
import languageReducer from "./reducers/language-block";
import skillsReducer from "./reducers/skills-block";
import basicsReducer from "./reducers/utils-reducer";

const store = configureStore({
	reducer: {
		// Define a top-level state field named `todos`, handled by `todosReducer`
		info: informationReducer,
		experience: experienceReducer,
		education: educationReducer,
		lang: languageReducer,
		skills: skillsReducer,
		basics: basicsReducer,
	},
});

export default store;

/* let store;

function initStore(preloadedState = initialState) {
  return createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
 */
