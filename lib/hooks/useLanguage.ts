import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

export const useLanguage = () => {
  const skills = useSelector((state: RootStateOrAny) => state.languages.skills);
  const dispatch = useDispatch();
  const addSkill = () =>
    dispatch({
      type: "ADD_LANGUAGE",
    });
  const setSkill = (skillId: string, field: string, value: string) => {
    dispatch({
      type: "EDIT_LANGUAGE",
      payload: { skillId, field, value },
    });
  };
  const removeSkill = (skillId: string) => {
    dispatch({
      type: "REMOVE_LANGUAGE",
      payload: { skillId },
    });
  };
  return {
    skills,
    addSkill,
    setSkill,
    removeSkill,
  };
};
