import { useState } from "react";
import styled from "styled-components";
import InfoPersonalFragment from "../../../components/InfoPersonal";
import Layout from "../../../components/Layout";
import PreviewPage from "../../../components/Preview";
import { htmlSetter } from "../../../lib/html-setter";
import { useInfoPersonal } from "../../../lib/hooks/useInfoPersonal";
import { FiX } from "react-icons/fi";
import { useBasics } from "../../../lib/hooks/useBasics";
import { StepsEnum } from "../../../lib/interface";
import ExperienceFragment from "../../../components/ExperienceFragment";
import { useExperience } from "../../../lib/hooks/useExperience";
import EducationFragment from "../../../components/EducationFragment";
import { useEducation } from "../../../lib/hooks/useEducation";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import SkillsFragment from "../../../components/SkillsFragment";
import { useSkills } from "../../../lib/hooks/useSkills";

const ContentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { template, personalInfo } = useInfoPersonal();
  const { experiences } = useExperience();
  const { education } = useEducation();
  const { skills } = useSkills();
  const {
    fullPreview,
    minPreview,
    step,
    setStep,
    expandSideMenu,
  } = useBasics();

  interface String {
    cycle(params: any): void;
  }

  const steps = [
    StepsEnum.INFORMATION,
    StepsEnum.EXPERIENCE,
    StepsEnum.EDUCATION,
    StepsEnum.SKILLS,
    StepsEnum.LANGUAGES,
  ];

  let DynamicComponent;
  switch (step) {
    case StepsEnum.INFORMATION:
      DynamicComponent = (
        <DynamicWrapper>
          {/* <NextWrapper>
            <button onClick={downLoadPdf}>
              {" "}
              {isLoading ? (
                <LoadingOutlined style={{ fontSize: 20 }} spin />
              ) : (
                "Download PDF"
              )}{" "}
            </button>
            <button onClick={() => setStep(steps[steps.indexOf(step) + 1])}>
              {" "}
              SIGUIENTE{" "}
            </button>
          </NextWrapper> */}
          <InfoPersonalFragment />{" "}
        </DynamicWrapper>
      );
      break;
    case StepsEnum.EXPERIENCE:
      DynamicComponent = (
        <DynamicWrapper>
          {/* <NextWrapper>
            <button onClick={downLoadPdf}>
              {" "}
              {isLoading ? (
                <LoadingOutlined style={{ fontSize: 20 }} spin />
              ) : (
                "Download PDF"
              )}{" "}
            </button>
            <button onClick={() => setStep(steps[steps.indexOf(step) + 1])}>
              {" "}
              SIGUIENTE{" "}
            </button>
          </NextWrapper> */}
          <ExperienceFragment />{" "}
        </DynamicWrapper>
      );
      break;
    case StepsEnum.EDUCATION:
      DynamicComponent = (
        <DynamicWrapper>
          {/* <NextWrapper>
            <button onClick={downLoadPdf}>
              {" "}
              {isLoading ? (
                <LoadingOutlined style={{ fontSize: 20 }} spin />
              ) : (
                "Download PDF"
              )}{" "}
            </button>
            <button onClick={() => setStep(steps[steps.indexOf(step) + 1])}>
              {" "}
              SIGUIENTE{" "}
            </button>
          </NextWrapper> */}
          <EducationFragment />{" "}
        </DynamicWrapper>
      );
      break;
    case StepsEnum.SKILLS:
      DynamicComponent = (
        <DynamicWrapper>
          {/* <NextWrapper>
            <button onClick={downLoadPdf}>
              {" "}
              {isLoading ? (
                <LoadingOutlined style={{ fontSize: 20 }} spin />
              ) : (
                "Download PDF"
              )}{" "}
            </button>
            <button onClick={() => setStep(steps[steps.indexOf(step) + 1])}>
              {" "}
              SIGUIENTE{" "}
            </button>
          </NextWrapper> */}
          <SkillsFragment />{" "}
        </DynamicWrapper>
      );
      break;
    default:
      DynamicComponent = (
        <DynamicWrapper>
          <h1> {step}</h1>{" "}
          {/* <NextWrapper>
            <button onClick={() => setStep(steps[steps.indexOf(step) + 1])}>
              {" "}
              SIGUIENTE{" "}
            </button>
          </NextWrapper> */}
        </DynamicWrapper>
      );
      break;
  }

  return (
    <Layout>
      {fullPreview && (
        <ModalPreview>
          <button onClick={minPreview}>
            {" "}
            <FiX />
          </button>
          <BigPaper
            dangerouslySetInnerHTML={{
              __html: htmlSetter(
                template,
                personalInfo,
                experiences,
                education,
                skills
              ),
            }}
          ></BigPaper>
        </ModalPreview>
      )}
      <Content>
        {DynamicComponent}
        <PreviewPage />
      </Content>
    </Layout>
  );
};

export default ContentPage;

export const Content = styled.div`
  height: 90vh;
  position: relative;
  display: grid;
  grid-area: content;
  background: #e7e7e7;
  width: 100%;
  grid-template-columns: 50vw 1fr;
  .expand-btn {
    display: grid;
    align-items: center;
    justify-content: center;
    position: absolute;
    color: white;
    font-weight: 600;
    height: 6vh;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    left: 0;
    border: none;
    width: 1vw;
    top: 44%;
    transform: translate(0, -50%);
    background: #201b35;
    cursor: pointer;
    &:hover {
      background: #603eec;
    }
    &:hover:before{
      border-color: transparent #603eec transparent transparent;
    }
    &:hover:after{
      border-color: transparent #603eec transparent transparent;
    }
    &:before {
      content: "";
      border-style: solid;
      border-width: 14px 14px 14px 14px;
      border-color: transparent #201b35 transparent transparent;
      position: absolute;
      left: 0px;
      top: -13px;
      transform: rotate(180deg);
    }
    &:after {
      content: "";
      border-style: solid;
      border-width: 14px 14px 14px 14px;
      border-color: transparent #201b35 transparent transparent;
      position: absolute;
      left: 0px;
      top:23px;
      transform: rotate(180deg);
    }
`;

export const ModalPreview = styled.div`
  height: 100vh;
  width: 100vw;
  background: #000000d1;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-y: scroll;
  display: grid;
  justify-content: center;
  padding: 2vh 0 2vh 0;
  button {
    position: fixed;
    display: flex;
    top: 2vh;
    right: 2vw;
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    padding: 6px 10px;
    border-radius: 3px;
    border: none;
    background: white;
    color: antiquewhite;
    transition: 0.3s;
    align-items: center;
    justify-self: center;
    color: black;
  }
`;

export const BigPaper = styled.div`
  // width: ${210 / 1.25}mm;
  // height: ${297 / 1.25}mm;
  // width: ${210}mm;
  // height: ${297}mm;
  // background: #eaeaea;
  // padding: 2vw;
  -webkit-transform-origin: top center;
  -ms-zoom: 1;
  -moz-transform: scale(1);
  //   -moz-transform-origin: 0 0;
  -o-transform: scale(1);
  //   -o-transform-origin: 0 0;
  -webkit-transform: scale(1);
  //   -webkit-transform-origin: 0 0;
`;

export const DynamicWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: grid;
  grid-template-rows: 1fr;
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
`;
export const NextWrapper = styled.div`
  background: #f4f4f4;
  width: 100%;
  height: 100%;
  padding: 1vw;
  grid-auto-flow: column;
  display: grid;
  button {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    color: white;
    letter-spacing: 3px;
    background: #603eec;
    width: fit-content;
    height: fit-content;
    justify-self: end;
    align-self: center;
    padding: 8px 20px;
  }
`;
// export async function getStaticProps(context) {
//   console.log(context.preview, "LA PREV");
//   if (context.preview) {
//     return {
//       props: {
//         data: context.previewData,
//       },
//     };
//   }
//   return { props: { data: "not data" } };
// }
