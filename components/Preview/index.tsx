import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { htmlSetter } from "../../lib/html-setter";
import { useInfoPersonal } from "../../lib/hooks/useInfoPersonal";
import { useBasics } from "../../lib/hooks/useBasics";
import { FaExpandAlt } from "react-icons/fa";
import { useExperience } from "../../lib/hooks/useExperience";
import { useEducation } from "../../lib/hooks/useEducation";
import { useSkills } from "../../lib/hooks/useSkills";

const PreviewPage = () => {
  const { personalInfo, template } = useInfoPersonal();
  const { experiences } = useExperience();
  const { education } = useEducation();
  const { maxPreview } = useBasics();
  const { skills } = useSkills();

  return (
    <MainWrapper>
      {/* <button onClick={maxPreview}>
        {" "}
        <FiZoomIn /> Ampliar{" "}
      </button> */}
      <PaperWrapper>
        <Paper
          onClick={maxPreview}
          dangerouslySetInnerHTML={{
            __html: htmlSetter(
              template,
              personalInfo,
              experiences,
              education,
              skills
            ),
          }}
        ></Paper>
        <ExpandIcon onClick={maxPreview}>
          {" "}
          <FaExpandAlt />{" "}
        </ExpandIcon>
      </PaperWrapper>
    </MainWrapper>
  );
};

export default PreviewPage;

export const MainWrapper = styled.div`
  padding: 2vw;
  position: relative;
  display: grid;
  background: #7a8599;
  grid-auto-rows: min-content;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #9f8bf2;
  }
  button {
    color: #5c3a5e;
    font-size: 12px;
    width: fit-content;
    display: grid;
    margin: 0 auto;
    background: white;
    grid-template-columns: 1vw 1fr;
    align-items: center;
    padding: 8px 10px;
    border: none;
    cursor: pointer;
    border: 1px solid #5c3a5e;
    border-radius: 3px;
    font-weight: 600;
  }
`;

export const Paper = styled.div`
  //   position: fixed;
  // width: ${210 / 2.25}mm;
  // height: ${297 / 2.25}mm;
  // width: ${210}mm;
  // height: ${297}mm;
  // background: #eaeaea;
  // padding: 2vw;
  // right: 0;
  cursor: pointer;
  transform-origin: center top;
  -ms-zoom: 0.45;
  -moz-transform: scale(0.45);
  -moz-transform-origin: center top;
  -o-transform: scale(0.45);
  -o-transform-origin: center top;
  -webkit-transform: scale(0.45);
  -webkit-transform-origin: center top;
`;

export const ExpandIcon = styled.div`
  transition: 0.3s;
  position: absolute;
  top: 80%;
  left: 52%;
  padding: 2px;
  transform: translate(-50%, -50%) scale(0);
  width: 30px;
  height: 30px;
  background: #603eec;
  color: white;
  font-weight: 600;
  display: grid;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;
export const PaperWrapper = styled.div`
  width: 30vw;
  height: 50vh;
  display: grid;
  justify-content: center;
  position: relative;
  transition: 0.3s;
  &:hover ${ExpandIcon} {
    transform: translate(-50%, -50%) scale(1.3);
  }
`;
// transform-origin: center top;
// -ms-zoom: 0.4;
// -moz-transform: scale(0.4);
//   -moz-transform-origin: 0 0;
// -o-transform: scale(0.4);
//   -o-transform-origin: 0 0;
// -webkit-transform: scale(0.4);
//   -webkit-transform-origin: 0 0;
