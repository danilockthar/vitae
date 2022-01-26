import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
import { Collapse } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useExperience } from "../../lib/hooks/useExperience";
import {
  GridElements,
  HeaderPanel,
  Input,
  InputElement,
  LateralElem,
} from "../../styles/elements";
import AddBtn from "../UI-Components/AddBtn";
import Datepicker from "../UI-Components/DatePicker";
import { monthToString } from "../UI-Components/DatePicker/months";

const ExperienceFragment = () => {
  const [isTinyMounted, setIsTinyMounted] = useState(false);
  const [isLoadingEditor, setIsLoadingEditor] = useState(false);
  const [activePanel, setActivePanel] = useState(0);
  const [lateralFocus, setLateralFocus] = useState(false);
  const { experiences, addExperience, setExperienceInfo, removeExperience } = useExperience();
  const { Panel } = Collapse;
  // const [, setToggle] = useState(true);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setToggle((toggle) => !toggle);
  //   }, 3000);
  //   return () => clearInterval(id);
  // }, []);

  const addExperienceFunc = () => {
    addExperience();
    setActivePanel(experiences.length + 1);
  };
  const list = [0, 3000];
  useEffect(() => {
    if (experiences.length === 1) {
      setActivePanel(1);
    } else {
      setActivePanel(0);
    }
  }, []);

  const handleChange = (event, id, isCheckbox = false) => {
    if (isCheckbox) {
      setExperienceInfo(id, event.target.name, "", true);
    } else {
      setExperienceInfo(id, event.target.name, event.target.value);
    }
  };

  const useCallbackChange = useCallback((event, id) => {
    return handleChange(event, id);
  }, []);

  return (
    <Wrapper>
      <h2> Agrega tus experiencias.</h2>
      {experiences.map((item, index) => {
        return (
          <SkillWrapper>
            <Collapse
              activeKey={[activePanel]}
              style={{
                borderRadius: "3px",
                border: "none",
                background: "white",
              }}
              expandIconPosition="right"
              onChange={(activeKey) =>
                setActivePanel(parseInt(activeKey[1], 10))
              }
            >
              <Panel
                style={{
                  border: "1px solid #eaeaea",
                  borderRadius: "3px",
                }}
                header={
                  <HeaderPanel>
                    {" "}
                    <h4 className="title-panel-custom">
                      {item.jobName.length > 0
                        ? item.jobName
                        : `Puesto ${index + 1}`}
                    </h4>{" "}
                    <p className="panel-date">
                      {" "}
                      {`${monthToString(item.startMonth)} ${item.startYear
                        }`} -{" "}
                      {item.stillHere
                        ? `PRESENTE`
                        : `${monthToString(item.endMonth)} ${item.endYear
                        }`}{" "}
                    </p>
                  </HeaderPanel>
                }
                key={index + 1}
                className="site-collapse-custom-panel"
              >
                <InputWrapper>
                  <GridElements>
                    <InputElement>
                      <span> Empresa </span>
                      <Input
                        value={item.company}
                        onChange={(event) => handleChange(event, item.id)}
                        name="company"
                        type="text"
                        placeholder="Fake Company SRL"
                      />
                    </InputElement>
                    <InputElement>
                      <span>Ciudad</span>
                      <Input
                        value={item.city}
                        onChange={(event) => handleChange(event, item.id)}
                        name="city"
                        type="text"
                        placeholder="Bariloche"
                      />
                    </InputElement>
                  </GridElements>
                  <GridElements isOne>
                    <InputElement>
                      <span> Nombre del puesto </span>
                      <Input
                        value={item.jobName}
                        onChange={(event) => handleChange(event, item.id)}
                        name="jobName"
                        type="text"
                        placeholder="Asistente administrativo"
                      />
                    </InputElement>
                  </GridElements>
                  <Datepicker
                    onChange={useCallbackChange}
                    id={item.id}
                    start={[item.startMonth, item.startYear]}
                    end={[item.endMonth, item.endYear]}
                    current={item.stillHere}
                    type="experience"
                  />
                  <EditorWrapper>
                    {isLoadingEditor && <p>loading...</p>}
                    <p className="job-responsability">
                      {" "}
                      {`${item.company.length === 0
                        ? `¿Cuales fueron tus tareas?`
                        : `¿Cuales fueron tus tareas en ${item.company}?`
                        }`}
                    </p>
                    <Editor
                      apiKey={
                        "2297qu9ymrxg4f28nd1yweefsswul5ny7d1q5b5ugtoqh2yn"
                      }
                      value={item.jobDescription}
                      onInit={(evt, editor) => {
                        setExperienceInfo(
                          item.id,
                          "jobDescription",
                          editor.getContent()
                        );
                      }}
                      onLoadContent={() => {
                        setIsLoadingEditor(false);
                        setIsTinyMounted(true);
                      }}
                      onEditorChange={(evt, editor) => {
                        setExperienceInfo(
                          item.id,
                          "jobDescription",
                          editor.getContent()
                        );
                      }}
                      onBeforeSetContent={() =>
                        isTinyMounted
                          ? () => {
                            return;
                          }
                          : setIsLoadingEditor(true)
                      }
                      init={{
                        setup: (ed) => {
                          setIsLoadingEditor(true);
                          ed.on("focus", () => {
                            setLateralFocus(true);
                          });
                          ed.on("blur", () => {
                            setLateralFocus(false);
                          });
                        },
                        height: 200,
                        width: "100%",
                        skin: false,
                        menubar: false,
                        branding: false,
                        statusbar: false,
                        plugins: [
                          "advlist autolink lists image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar: "bold italic | bullist | ",
                        content_style:
                          "body { font-family:Inter,sans-serif; font-size:14px; background: #f2f5fa; }",
                      }}
                    />
                    <LateralElem isFocus={lateralFocus} />
                  </EditorWrapper>
                </InputWrapper>
              </Panel>
            </Collapse>
            <a className="delete-panel" onClick={() => removeExperience(item.id)}>
              {" "}
              <AiFillDelete />{" "}
            </a>
          </SkillWrapper>
        );
      })}
      <AddBtn type="experiencia" addFunction={addExperienceFunc} />
    </Wrapper>
  );
};

export default ExperienceFragment;

export const Wrapper = styled.div`
  /* overflow-y: scroll; */
  /* height: -webkit-fit-content; */
  height: -moz-fit-content;
  height: fit-content;
  overflow-y: scroll;
  padding: 3vw 2vw;
  display: grid;
  grid-auto-rows: min-content;
  width: 100%;
  height: 100%;
  background: white;
  grid-row-gap: 2vh;
  .site-collapse-custom-panel {
    background: white;
    font-family: "Inter", sans-serif;
  }
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

export const EditorWrapper = styled.div`
  margin: 2vh 0 0 0;
  .job-responsability {
    font-size: 0.8rem;
    user-select: none;
    margin: 0 0 1vh 0;
  }
`;
export const InputWrapper = styled.div`
  /* overflow-y: scroll; */
  /* height: -webkit-fit-content; */
  height: -moz-fit-content;
  height: fit-content;
  display: grid;
  grid-auto-rows: min-content;
  width: 100%;
  height: 100%;
  background: white;
  grid-row-gap: 2vh;
`;
export const SkillWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2vw;
  align-items: center;
  .delete-panel {
    justify-self: end;
    color: #363d49;
    font-size: 1.2rem;
  }
`;
