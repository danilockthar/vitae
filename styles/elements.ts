import styled from "styled-components";

export const InputElement = styled.div`
  border-radius: 3px;
  display: grid;
  position: relative;
  border-bottom: 2px solid #1e90ff00;
  // border: 1px solid #f2f5fa;
  background: #f2f5fa;
  transition: 0.3s;
  padding: 6px 10px 10px 10px;
  width: ${(props) => (props.isDatePicker ? "9vw" : "100%")};
  &:focus-within {
    border-bottom: 2px solid #7057d9;
  }
  span {
    width: ${(props) => (props.isDatePicker ? "8vw" : "100%")};
    font-size: 12px;
    color: #201b35ba;
    font-weight: 600;
  }
  input,
  select {
    width: ${(props) => (props.isDatePicker ? "8vw" : "100%")};
    color: black;
    outline: none;
    height: fit-content;
    border: none;
    background: none;
    padding: 2px 0 0 0;
    ::placeholder,
    ::-webkit-input-placeholder {
      color: #00000052;
    }
    :-ms-input-placeholder {
      color: #00000052;
    }
  }
  #option-placeholder {
    color: #00000052 !important;
  }
  #disabled-select {
    color: #00000052;
    option:checked {
      color: #00000052;
    }
    option:not(:checked) {
      color: black;
    }
  }
`;
export const Input = styled.input`
  width: ${(props) => (props.isDatePicker ? "8vw" : "100%")};
  color: black;
  outline: none;
  height: fit-content;
  border: none;
  background: none;
  padding: 2px 0 0 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #00000052;
  }
  :-ms-input-placeholder {
    color: #00000052;
  }
`;
export const GridElements = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isSelect ? "1fr 1fr 1fr" : props.isOne ? "1fr" : "1fr 1fr"};
  grid-column-gap: 2vw;
  width: 100%;
`;
export const HeaderPanel = styled.div`
  background: white;
  .title-panel-custom {
    letter-spacing: 1px;
    font-family: "Inter", sans-serif;
    color: #363d49;
    font-weight: 800;
    margin: 0;
  }
  .panel-date {
    font-family: "Inter", sans-serif;
    color: #98a1b3;
    font-weight: 600;
    font-size: 0.8rem;
  }
`;
export const InputCheckbox = styled.div`
  display: grid;
  grid-auto-flow: column;
  /* grid-auto-columns: min-content; */
  /* height: 10vh; */
  align-items: center;
  p {
    font-size: 0.8em;
  }
`;
export const LateralElem = styled.div`
  height: 2px;
  width: 100%;
  transition: 0.3s;
  background: ${(props) => (props.isFocus ? "#7057d9" : "#1e90ff00")};
`;
