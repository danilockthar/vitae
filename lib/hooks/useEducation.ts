import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

export const useEducation = () => {
  const education = useSelector(
    (state: RootStateOrAny) => state.education.education
  );

  const dispatch = useDispatch();
  const addEducation = () =>
    dispatch({
      type: "ADD_EDUCATION",
    });
  const setEducationInfo = (
    educId: string,
    field: string,
    value: string,
    isCheckbox?: boolean
  ) => {
    dispatch({
      type: "SET_EDUCATION_INFO",
      payload: { educId, field, value, isCheckbox },
    });
  };
  return {
    addEducation,
    setEducationInfo,
    education,
  };
};
