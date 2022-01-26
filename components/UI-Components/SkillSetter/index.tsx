import { FC, memo, useEffect, useMemo, useState } from "react";
import { Expertise } from "../../../lib/reducers/skills-block";
import styled, { css } from "styled-components";

interface SkillSetterProps {
  onChange: (event: Expertise | null, id: number | null) => void;
  value?: Expertise;
  id?: number;
}

const SkillSetter: FC<SkillSetterProps> = memo(({ value, onChange, id }) => {
  const [expertise, setExpertise] = useState<Expertise>(
    value ?? Expertise.EXPERT
  );

  const getEvent = () => {
    return expertise;
  };

  useEffect(() => {
    onChange(getEvent(), id);
  }, [expertise]);

  return (
    <SetterWrapper expertise={expertise}>
      <div className="text-wrapper">
        <p> Nivel - {expertise.toUpperCase()} </p>
      </div>
      <div className="box-wrapper">
        <div className="marker"> </div>
        <BoxSetter
          onClick={() => setExpertise(Expertise.NOVICE)}
          activeBox={expertise === Expertise.NOVICE}
        >
          <p className="skill-value"> +1</p>
        </BoxSetter>
        <BoxSetter
          onClick={() => setExpertise(Expertise.BEGINNER)}
          activeBox={expertise === Expertise.BEGINNER}
        >
          <p className="skill-value"> +2</p>
        </BoxSetter>
        <BoxSetter
          onClick={() => setExpertise(Expertise.SKILLFUL)}
          activeBox={expertise === Expertise.SKILLFUL}
        >
          <p className="skill-value"> +3</p>
        </BoxSetter>
        <BoxSetter
          onClick={() => setExpertise(Expertise.EXPERIENCED)}
          activeBox={expertise === Expertise.EXPERIENCED}
        >
          <p className="skill-value"> +4</p>
        </BoxSetter>
        <BoxSetter
          onClick={() => setExpertise(Expertise.EXPERT)}
          activeBox={expertise === Expertise.EXPERT}
        >
          <p className="skill-value"> +5</p>
        </BoxSetter>
      </div>
    </SetterWrapper>
  );
});

export default SkillSetter;

export const BoxSetter = styled.div`
  border: 1px solid #0000000d;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  .skill-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weigt: 600;
    font-family: "Inter", sans-serif;
    user-select: none;
    font-size: 0.7rem;
    color: ${(props) => (props.activeBox ? "white" : "#33333329")};
  }
`;

export const SetterWrapper = styled.div`
  display: grid;
  grid-template-rows: 4vh;

  .text-wrapper p {
    margin: 0;
    font-size: 0.6rem;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    color: #737272;
  }
  .box-wrapper {
    position: relative;
    border-radius: 5px;
    display: grid;
    width: 20vw;
    grid-template-columns: 4vw 4vw 4vw 4vw 4vw;
    height: 100%;
    ${(props) =>
      props.expertise === Expertise.NOVICE &&
      css`
        background: #ffeeee;
      `};
    ${(props) =>
      props.expertise === Expertise.BEGINNER &&
      css`
        background: #fff4ee;
      `};
    ${(props) =>
      props.expertise === Expertise.SKILLFUL &&
      css`
        background: #fef8e8;
      `};
    ${(props) =>
      props.expertise === Expertise.EXPERT &&
      css`
        background: #ddddff;
      `};
    ${(props) =>
      props.expertise === Expertise.EXPERIENCED &&
      css`
        background: #e9f8f0;
      `};

    .marker {
      width: 4vw;
      height: 100%;
      position: absolute;
      transition: 0.5s;
      border-radius: 0;
      ${(props) =>
        props.expertise === Expertise.NOVICE &&
        css`
          background: #ff5959;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        `};
      ${(props) =>
        props.expertise === Expertise.BEGINNER &&
        css`
          background: #ff9159;
        `};
      ${(props) =>
        props.expertise === Expertise.SKILLFUL &&
        css`
          background: #f3b721;
        `};
      ${(props) =>
        props.expertise === Expertise.EXPERT &&
        css`
          background: #7057d9;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        `};
      ${(props) =>
        props.expertise === Expertise.EXPERIENCED &&
        css`
          background: #25b869;
        `};
      ${(props) =>
        props.expertise === Expertise.NOVICE &&
        css`
          transform: translateX(0vw);
        `};
      ${(props) =>
        props.expertise === Expertise.BEGINNER &&
        css`
          transform: translateX(4vw);
        `};
      ${(props) =>
        props.expertise === Expertise.SKILLFUL &&
        css`
          transform: translateX(8vw);
        `};
      ${(props) =>
        props.expertise === Expertise.EXPERIENCED &&
        css`
          transform: translateX(12vw);
        `};
      ${(props) =>
        props.expertise === Expertise.EXPERT &&
        css`
          transform: translateX(16vw);
        `};
    }
  }
`;
