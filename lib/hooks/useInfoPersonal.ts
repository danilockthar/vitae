import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Template } from "../interface";

export const useInfoPersonal = () => {
  const template = useSelector((state: RootStateOrAny) => state.info.template);
  const personalInfo = useSelector(
    (state: RootStateOrAny) => state.info.personalInfo
  );
  const dispatch = useDispatch();
  const setTemplate = (template: Template) =>
    dispatch({
      type: "SET_TEMPLATE",
      template,
    });
  const setPersonalInfo = (field: string, value: string) =>
    dispatch({
      type: "SET_PERSONAL_INFO",
      payload: { field, value },
    });
  return {
    template,
    personalInfo,
    setTemplate,
    setPersonalInfo,
  };
};
