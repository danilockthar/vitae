import { useCallback, useEffect, useState } from "react";
import { Collapse } from "antd";
import styled from "styled-components";
import { GridElements, HeaderPanel, InputElement } from "../../styles/elements";
import { useSkills } from "../../lib/hooks/useSkills";
import AddBtn from "../UI-Components/AddBtn";
import SkillSetter from "../UI-Components/SkillSetter";
import { AiFillDelete } from "react-icons/ai";

const SkillsFragment = () => {
  const [activePanel, setActivePanel] = useState(0);
  const { skills, addSkill, setSkill, removeSkill } = useSkills();
  const { Panel } = Collapse;

  const addSkillUi = () => {
    addSkill();
    setActivePanel(skills.length + 1);
  };

  useEffect(() => {
    if (skills.length === 1) {
      setActivePanel(1);
    } else {
      setActivePanel(0);
    }
  }, []);

  const handleChange = (event, id) => {
    setSkill(id, event.target.name, event.target.value);
  };

  const useCall = useCallback((event, id) => {
    return setSkill(id, "expertise", event);
  }, []);
  return (
    <Wrapper>
      <h2> Agrega tus habilidades.</h2>

      {skills.map((item, index) => {
        return (
          <SkillWrapper>
            <Collapse
              // defaultActiveKey={[experiences.length]}
              activeKey={[activePanel]}
              style={{
                borderRadius: "3px",
                border: "none",
                background: "white",
                position: "relative",
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
                      {item.name.length > 0 ? item.name : `Skill ${index + 1}`}
                    </h4>{" "}
                    <p className="panel-date">{item.expertise.toUpperCase()}</p>
                  </HeaderPanel>
                }
                key={index + 1}
                className="site-collapse-custom-panel"
              >
                <GridElements>
                  <InputElement>
                    <span> Skill </span>
                    <input
                      value={item.name}
                      onChange={(e) => handleChange(e, item.id)}
                      name="name"
                      type="text"
                      placeholder="Agrega una habilidad"
                    />
                  </InputElement>
                  <SkillSetter
                    key={item.id}
                    id={item.id}
                    onChange={useCall}
                    value={item.expertise}
                  />
                </GridElements>
              </Panel>
            </Collapse>
            <a className="delete-panel" onClick={() => removeSkill(item.id)}>
              {" "}
              <AiFillDelete />{" "}
            </a>
          </SkillWrapper>
        );
      })}

      <AddBtn type="habilidad" addFunction={addSkillUi} />
    </Wrapper>
  );
};

export default SkillsFragment;
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
