import { FC, memo, useEffect, useReducer, useRef, useState } from "react";
import { months } from "./UI-Components/DatePicker/months";
import { initialState, reducer } from "./UI-Components/DatePicker/store";
import lodash from "lodash";
import next from "next";
// Load the full build.
var _ = require("lodash");
// Load the core build.

interface Props {
  onChange: (event: EventDto | null, id: string | null) => void;
  start?: number[];
  end?: number[];
  id?: string;
  current?: boolean;
  type?: string;
  startMonth?: { month: number; year: number };
}

interface dateDto {
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  stillHere: boolean;
}
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

const Testing: FC<Props> = memo(
  ({ onChange, start, end, current, type, id, startMonth }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("as");
    console.log(startMonth);
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
    // useEffect(() => {
    //   if (start !== undefined) {
    //     handleDispatch("startMonth", start[0]);
    //     handleDispatch("startYear", start[1]);
    //   }
    //   if (end !== undefined) {
    //     handleDispatch("endMonth", end[0]);
    //     handleDispatch("endYear", end[1]);
    //   }
    //   if (current !== undefined) {
    //     handleDispatch("stillHere", current);
    //   }
    // }, []);

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
    // useClickAway(ref, () => {
    //   handleDispatch("showInit", false);
    //   handleDispatch("showEnd", false);
    // });
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

    console.log("RENDERED");
    return (
      <div>
        {months.map((item) => {
          return (
            <p onClick={() => handleDispatch("startMonth", item.pos)}>
              {" "}
              {item.name}
            </p>
          );
        })}
      </div>
    );
  },
  moviePropsAreEqual
);

export default Testing;

function moviePropsAreEqual(prevMovie, nextMovie) {
  return _.isEqual(prevMovie, nextMovie);
}
