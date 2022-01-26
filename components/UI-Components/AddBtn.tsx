import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  addFunction: () => void;
  type: string;
}

const AddBtn: FC<Props> = ({ addFunction, type }) => {
  return (
    <AddBtnWrapper>
      <button className="add-btn" onClick={addFunction}>
        {" "}
        <FaPlus size="12px" /> Añadir {type}
      </button>
    </AddBtnWrapper>
  );
};

export default AddBtn;

export const AddBtnWrapper = styled.div`
  display: grid;
  justify-content: end;
  padding: 0 0 4vh 0;
  button {
    color: #603eec;
    font-size: 15px;
    display: grid;
    background: white;
    grid-template-columns: 1vw 1fr;
    grid-column-gap: 5px;
    align-items: center;
    padding: 8px 10px;
    border: none;
    transition: 0.3s;
    cursor: pointer;
    border-radius: 3px;
    font-weight: 600;
    &:hover {
      background: #f2f5fa;
    }
  }
`;
