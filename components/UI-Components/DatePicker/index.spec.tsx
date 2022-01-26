import React from "react";
import {
  fireEvent,
  getByText,
  prettyDOM,
  render,
  screen,
} from "@testing-library/react";
import Datepicker from ".";

describe("Datepicker component", () => {
  it("Will render the datepicker", () => {
    const mockEvent = jest.fn();
    const component = render(
      <Datepicker
        onChange={mockEvent}
        start={[0, 2019]}
        end={[0, 2021]}
        current={true}
      />
    );

    expect(screen.getByPlaceholderText("End date")).toBeInTheDocument();
    const inputEnd = screen.getByPlaceholderText("End date");
    fireEvent.change(inputEnd);
    expect(mockEvent).toHaveBeenCalledTimes(2);
    expect(
      screen.queryByText("Actualmente estoy estudiando aquí.")
    ).not.toBeInTheDocument();
    fireEvent.click(inputEnd);
    expect(screen.getByText("Actualmente estoy estudiando aquí."))
      .toContainHTML;
  });
});
