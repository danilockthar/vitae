import { FC, memo, useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { InputElement } from "../../../styles/elements";
import { months, monthToString } from "./months";
import { useClickAway } from "@geist-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { initialState, reducer } from "./store";
import lodash from "lodash";
import next from "next";
// Load the full build.
var _ = require("lodash");

interface EventDto {
  target: {
    name: string;
    value: boolean | number;
  };
}

export interface DatepickProps {
  onChange: (event: EventDto | null, id: string | null) => void;
  start?: number[];
  end?: number[];
  id?: string;
  current?: boolean;
  type?: string;
} /* onChange DatepickProps requiere una funcion con parametro date && event*/

const Datepicker: FC<DatepickProps> = memo(
  ({ onChange, start, end, current, type, id }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleDispatch = (name, value) => {
      dispatch({
        type: "SET_STATE",
        name,
        payload: value,
      });
    };
    const ref = useRef(null);
    const refStart = useRef(null);
    const refEnd = useRef(null);

    const date = () => {
      /* Return all values as an object */
      return {
        startYear: state.startYear,
        startMonth: state.startMonth,
        endYear: state.endYear,
        endMonth: state.endMonth,
        stillHere: state.stillHere,
      };
      // `${monthToString(startMonth)} ${startYear}`,
      // `${monthToString(endMonth)} ${endYear}`,
      // stillHere,
    };

    const getEventValue = (event) => {
      /* Return value by name event */
      let val: any;
      switch (event) {
        case "startMonth":
          val = state.startMonth;
          break;
        case "startYear":
          val = state.startYear;
          break;
        case "endMonth":
          val = state.endMonth;
          break;
        case "endYear":
          val = state.endYear;
          break;
        case "stillHere":
          val = state.stillHere;
          break;
      }
      return {
        target: {
          name: event,
          value: val,
        },
      };
    };

    /*Setting default value on start, this avoid infinite loop */
    useEffect(() => {
      if (start !== undefined) {
        handleDispatch("startMonth", start[0]);
        handleDispatch("startYear", start[1]);
      }
      if (end !== undefined) {
        handleDispatch("endMonth", end[0]);
        handleDispatch("endYear", end[1]);
      }
      if (current !== undefined) {
        handleDispatch("stillHere", current);
      }
    }, []);

    /* On every change i set the callback props values *(date, event) */
    useEffect(() => {
      onChange(getEventValue(state.lastEvent), id);
    }, [
      state.startMonth,
      state.startYear,
      state.endMonth,
      state.endYear,
      state.stillHere,
    ]);

    /*This hook was made to close the datepicker selection by clicking outside of it */
    useClickAway(ref, () => {
      handleDispatch("showInit", false);
      handleDispatch("showEnd", false);
    });
    useEffect(() => {
      /* When months change the datepicker it close automatically */
      handleDispatch("showInit", false);
      handleDispatch("showEnd", false);
    }, [state.startMonth, state.endMonth]);

    const startInitDatepicker = () => {
      handleDispatch("showEnd", false);
      handleDispatch("showInit", true);
    };
    const startEndDatepicker = () => {
      handleDispatch("showInit", false);
      handleDispatch("showEnd", true);
    };

    return (
      <DatePickerWrapper ref={ref}>
        {/* Inputs block */}
        <InputElement isDatePicker>
          <span>Fecha de inicio</span>
          <input
            ref={refStart}
            value={`${monthToString(state.startMonth)}, ${state.startYear}`}
            name="studyArea"
            type="text"
            readOnly
            placeholder="Artes"
            onClick={startInitDatepicker}
          />
        </InputElement>
        <InputElement isDatePicker>
          <span>Fecha de fin</span>
          <input
            ref={refEnd}
            value={
              state.stillHere
                ? `Presente`
                : `${monthToString(state.endMonth)}, ${state.endYear}`
            }
            name="studyArea"
            type="text"
            readOnly
            placeholder="End date"
            onClick={startEndDatepicker}
          />
        </InputElement>
        {/* Inputs block */}

        {/*Date Selector block */}
        {state.showInit && (
          <PickerWrapper onClick={() => refStart.current.focus()}>
            <YearHeader>
              <FaChevronLeft
                color={"#5f38ff"}
                onClick={() => {
                  handleDispatch("startYear", state.startYear - 1);
                  handleDispatch("lastEvent", "startYear");
                }}
              />
              <p> {state.startYear} </p>
              <FaChevronRight
                color={"#5f38ff"}
                onClick={() => {
                  handleDispatch("startYear", state.startYear + 1);
                  handleDispatch("lastEvent", "startYear");
                }}
              />
            </YearHeader>
            <MonthField>
              {months.map((item) => {
                return (
                  <MonthTag
                    key={item.pos}
                    active={state.startMonth === item.pos}
                    onClick={() => {
                      handleDispatch("startMonth", item.pos);
                      handleDispatch("lastEvent", "startMonth");
                    }}
                  >
                    {item.name}
                  </MonthTag>
                );
              })}
            </MonthField>
          </PickerWrapper>
        )}
        {state.showEnd && (
          <PickerWrapper
            id="picker-wrapper"
            hasCurrentOpt
            onClick={() => refEnd.current.focus()}
          >
            <YearHeader>
              <FaChevronLeft
                color={state.stillHere ? "#00000040" : "#5f38ff"}
                onClick={() => {
                  if (state.stillHere) return;
                  handleDispatch("endYear", state.endYear - 1);
                  handleDispatch("lastEvent", "endYear");
                }}
              />
              <YearPtag disabled={state.stillHere}> {state.endYear} </YearPtag>
              <FaChevronRight
                color={state.stillHere ? "#00000040" : "#5f38ff"}
                onClick={() => {
                  if (state.stillHere) return;
                  handleDispatch("endYear", state.endYear + 1);
                  handleDispatch("lastEvent", "endYear");
                }}
              />
            </YearHeader>
            <MonthField>
              {months.map((item) => {
                return (
                  <MonthTag
                    disabled={state.stillHere}
                    key={item.pos}
                    active={state.endMonth === item.pos}
                    onClick={() => {
                      if (state.stillHere) {
                        return;
                      } else {
                        handleDispatch("endMonth", item.pos);
                        handleDispatch("lastEvent", "endMonth");
                      }
                    }}
                  >
                    {item.name}
                  </MonthTag>
                );
              })}
            </MonthField>
            <CurrentStatus>
              <Switcher
                current={state.stillHere}
                onClick={() => {
                  handleDispatch("stillHere", !state.stillHere);
                  handleDispatch("lastEvent", "stillHere");
                }}
              >
                <SwitchCircle current={state.stillHere} />
              </Switcher>
              <p>
                {" "}
                Actualmente estoy
                {type === "experience" ? " trabajando" : " estudiando"} aquí.
              </p>
            </CurrentStatus>
          </PickerWrapper>
        )}
        {/*Date Selector block */}
      </DatePickerWrapper>
    );
  },
  arePropsEqual
);

export default Datepicker;

function arePropsEqual(prevProps, nextProps) {
  return _.isEqual(prevProps, nextProps);
}

export const DatePickerWrapper = styled.div`
  width: 20vw;
  display: grid;
  grid-template-columns: 10vw 10vw;
  grid-column-gap: 1vw;
  box-sizing: border-box;
  position: relative;
`;

export const PickerWrapper = styled.div`
  position: absolute;
  top: 11vh;
  z-index: 2000;
  width: 20vw;
  height: ${(props) => (props.hasCurrentOpt ? "34vh" : "28vh")};
  grid-row-gap: 1vh;
  border-radius: 3px;
  padding: 5px;
  background: #f2f5fa;
  display: grid;
  grid-template-rows: 4vh 1fr;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 18%);
  -webkit-box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 18%);
`;
export const YearHeader = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr 20%;
  padding: 6px 0;
  justify-items: center;
  align-items: center;
  p {
    font-family: "Inter", sans-serif;
    font-weight: 800;
    cursor: pointer;
    user-select: none;
  }
  svg {
    cursor: pointer;
  }
`;
export const MonthField = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
  justify-items: center;
  aling-items: center;
`;
export const MonthTag = styled.a`
  user-select: none;
  background: ${(props) =>
    props.disabled ? "#e5e8ec" : props.active ? "#5f38ff" : "none"};
  padding: 2px;
  width: 85%;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  text-align: center;
  border-radius: 3px;
  align-self: center;
  color: ${(props) => (props.active ? "white" : "#333")};
  &:hover {
    background: ${(props) =>
      props.disabled ? "#e5e8ec" : props.active ? "#5f38ff" : "#d9d4ef"};
    color: ${(props) =>
      props.disabled ? "#00000040" : props.active ? "white" : "#333"};
  }
`;
export const Switcher = styled.div`
  margin: 0 0 0 6px;
  height: 22px;
  cursor: pointer;
  width: 45px;
  background: ${(props) => (props.current ? "#5f38ff" : "#c5ccdb")};
  position: relative;
  border-radius: 20px;
  display: grid;
  align-items: center;
  transition: 0.15s;
  // justify-content: ${(props) => (props.current ? "end" : "baseline")};
  padding: ${(props) => (props.current ? "0 1px 0 0" : "0 0 0 1px")};
`;
export const SwitchCircle = styled.div`
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  transition: 0.3s;
  transform: translateX(${(props) => (props.current ? "25px" : "1px")});
  // margin: ${(props) => (props.current ? "0 1px 0 0" : "0 23px 0 0")};
`;
export const CurrentStatus = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  padding: 0 0 0.7vh 0;
  p {
    font-family: "Inter", sans-serif;
    font-size: 0.7rem;
  }
`;
export const YearPtag = styled.p`
  color: ${(props) => (props.disabled ? "#00000040" : "#242525")};
`;
