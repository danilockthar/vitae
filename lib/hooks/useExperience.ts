import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { ExperienceDto } from "../reducers/experience-block";

export const useExperience = () => {
  const experiences = useSelector(
    (state: RootStateOrAny) => state.experience.experiences
  );

  const dispatch = useDispatch();
  const addExperience = () =>
    dispatch({
      type: "ADD_EXPERIENCE",
    });
  const setExperienceInfo = (
    expId: string,
    field: string,
    value: string,
    isCheckbox?: boolean
  ) => {
    dispatch({
      type: "SET_EXPERIENCE_INFO",
      payload: { expId, field, value, isCheckbox },
    });
  };
  const removeExperience = (expId: string) => {
    dispatch({
      type: "REMOVE_EXPERIENCE",
      payload: { expId },
    });
  };
  return {
    addExperience,
    setExperienceInfo,
    removeExperience,
    experiences,
  };
};
