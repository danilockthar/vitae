import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

export const useSkills = () => {
  const skills = useSelector((state: RootStateOrAny) => state.skills.skills);
  const dispatch = useDispatch();
  const addSkill = () =>
    dispatch({
      type: "ADD_SKILL",
    });
  const setSkill = (skillId: string, field: string, value: string) => {
    dispatch({
      type: "EDIT_SKILL",
      payload: { skillId, field, value },
    });
  };
  const removeSkill = (skillId: string) => {
    dispatch({
      type: "REMOVE_SKILL",
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
