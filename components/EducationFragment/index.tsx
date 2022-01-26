import { Editor } from "@tinymce/tinymce-react";
import { Collapse } from "antd";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useEducation } from "../../lib/hooks/useEducation";
import { AiFillDelete } from "react-icons/ai";
import {
  GridElements,
  HeaderPanel,
  InputCheckbox,
  InputElement,
  LateralElem,
} from "../../styles/elements";
import AddBtn from "../UI-Components/AddBtn";
import Datepicker from "../UI-Components/DatePicker";
import { monthToString } from "../UI-Components/DatePicker/months";

const EducationFragment = () => {
  const [isTinyMounted, setIsTinyMounted] = useState(false);
  const [isLoadingEditor, setIsLoadingEditor] = useState(false);
  const [activePanel, setActivePanel] = useState(0);
  const [lateralFocus, setLateralFocus] = useState(false);
  const { education, addEducation, setEducationInfo } = useEducation();
  const { Panel } = Collapse;

  const addEducationFunc = () => {
    addEducation();
    setActivePanel(education.length + 1);
  };

  useEffect(() => {
    if (education.length === 1) {
      setActivePanel(1);
    } else {
      setActivePanel(0);
    }
  }, []);

  const handleChange = (event, id, isCheckbox = false) => {
    if (isCheckbox) {
      setEducationInfo(id, event.target.name, "", true);
    } else {
      setEducationInfo(id, event.target.name, event.target.value);
    }
  };

  const useCallbackChange = useCallback((event, id) => {
    return handleChange(event, id);
  }, []);

  return (
    <Wrapper>
      <h2> Agrega tu educación.</h2>
      {education.map((item, index) => {
        return (
          <SkillWrapper>
            <Collapse
              // defaultActiveKey={[experiences.length]}
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
                      {item.grade.length > 0
                        ? item.grade
                        : `Puesto ${index + 1}`}
                    </h4>{" "}
                    <p className="panel-date">
                      {" "}
                      {`${monthToString(item.startMonth)} ${
                        item.startYear
                      }`} -{" "}
                      {item.stillHere
                        ? `PRESENTE`
                        : `${monthToString(item.endMonth)} ${
                            item.endYear
                          }`}{" "}
                    </p>
                  </HeaderPanel>
                }
                key={index + 1}
                className="site-collapse-custom-panel"
              >
                <InputWrapper>
                  <GridElements isOne>
                    <InputElement>
                      <span> Nombre de la institución </span>
                      <input
                        value={item.institution}
                        onChange={(event) => handleChange(event, item.id)}
                        name="institution"
                        type="text"
                        placeholder="Universidad Nacional de Rio Negro"
                      />
                    </InputElement>
                  </GridElements>
                  <GridElements isOne>
                    <InputElement>
                      <span>Ciudad</span>
                      <input
                        value={item.city}
                        onChange={(event) => handleChange(event, item.id)}
                        name="city"
                        type="text"
                        placeholder="Bariloche"
                      />
                    </InputElement>
                  </GridElements>
                  <GridElements>
                    <InputElement>
                      <span>Título</span>
                      <input
                        value={item.grade}
                        onChange={(event) => handleChange(event, item.id)}
                        name="grade"
                        type="text"
                        placeholder="Diseñador gráfico"
                      />
                    </InputElement>
                    <InputElement>
                      <span>Area</span>
                      <input
                        value={item.studyArea}
                        onChange={(event) => handleChange(event, item.id)}
                        name="studyArea"
                        type="text"
                        placeholder="Artes"
                      />
                    </InputElement>
                  </GridElements>
                  <Datepicker
                    onChange={useCallbackChange}
                    id={item.id}
                    start={[item.startMonth, item.startYear]}
                    end={[item.endMonth, item.endYear]}
                    current={item.stillHere}
                    type="education"
                  />
                  <EditorWrapper>
                    {isLoadingEditor && <p>loading...</p>}
                    <p className="job-responsability">
                      {" "}
                      {`${
                        item.institution.length === 0
                          ? `¿Cuales fueron tus tareas?`
                          : `¿Cuales fueron tus tareas en ${item.institution}?`
                      }`}
                    </p>
                    <Editor
                      apiKey={
                        "2297qu9ymrxg4f28nd1yweefsswul5ny7d1q5b5ugtoqh2yn"
                      }
                      value={item.description}
                      onInit={(evt, editor) => {
                        setEducationInfo(
                          item.id,
                          "description",
                          editor.getContent()
                        );
                      }}
                      onLoadContent={() => {
                        setIsLoadingEditor(false);
                        setIsTinyMounted(true);
                      }}
                      onEditorChange={(evt, editor) => {
                        setEducationInfo(
                          item.id,
                          "description",
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
                          "body { font-family:Inter,sans-serif; font-size:14px; background: #f2f5fa;}",
                      }}
                    />
                    <LateralElem isFocus={lateralFocus} />
                  </EditorWrapper>
                </InputWrapper>
              </Panel>
            </Collapse>
            <a className="delete-panel" onClick={() => console.log(item.id)}>
              {" "}
              <AiFillDelete />{" "}
            </a>
          </SkillWrapper>
        );
      })}
      <AddBtn type="educación" addFunction={addEducationFunc} />
    </Wrapper>
  );
};

export default EducationFragment;

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
    user-select: none;
    font-size: 0.8rem;
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
