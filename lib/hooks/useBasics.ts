import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

export const useBasics = () => {
  const fullPreview = useSelector(
    (state: RootStateOrAny) => state.basics.fullPreview
  );
  const step = useSelector((state: RootStateOrAny) => state.basics.step);
  const expand = useSelector((state: RootStateOrAny) => state.basics.expand);
  const size = useSelector((state: RootStateOrAny) => state.basics.size);

  const dispatch = useDispatch();
  const setStep = (step: String) =>
    dispatch({
      type: "SET_STEP",
      payload: step,
    });
  const maxPreview = () => {
    dispatch({
      type: "MAX_PREVIEW",
    });
  };
  const expandSideMenu = () => {
    dispatch({
      type: "EXPAND_SIDE",
    });
  };
  const minPreview = () => {
    dispatch({
      type: "MIN_PREVIEW",
    });
  };
  const resizeMenu = (size: number) => {
    dispatch({
      type: "RESIZE",
      payload: size,
    });
  };
  return {
    step,
    setStep,
    expandSideMenu,
    resizeMenu,
    size,
    expand,
    fullPreview,
    maxPreview,
    minPreview,
  };
};
