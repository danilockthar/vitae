import { combineReducers } from "redux";
import info, { initialState as infoState } from "./information-block";
import basics, { initialState as basicState } from "./utils-reducer";
import experience, { initialState as experiences } from "./experience-block";
import education, { initialState as educationState } from "./education-block";
import skills, { initialState as skillsState } from "./skills-block";
import languages, { initialState as languageState } from "./language-block";

export const initialState = {
  info: infoState,
  basics: basicState,
  experience: experiences,
  education: educationState,
  skills: skillsState,
  languages: languageState,
};

export default combineReducers({
  info,
  basics,
  experience,
  education,
  skills,
  languages,
});
