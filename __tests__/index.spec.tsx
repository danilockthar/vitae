// import React from "react";
// import { mount } from "enzyme";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";
// import Dashboard from "../pages/dashboard";
// import { initialState as infoState } from "../lib/reducers/information-block";
// import { initialState as expState } from "../lib/reducers/experience-block";
// import { initialState as educState } from "../lib/reducers/education-block";
// import { initialState as skillsState } from "../lib/reducers/skills-block";
// import Index from "../pages";

// describe("index page", () => {
//   it("should have App component", () => {
//     const middlewares = [];
//     const mockStore = configureStore(middlewares);
//     // Initialize mockstore with empty state
//     const initialState = {
//       basics: {
//         fullPreview: false,
//       },
//       info: infoState,
//       experience: expState,
//       education: educState,
//       skills: skillsState,
//     };
//     const store = mockStore(initialState);
//     const subject = mount(
//       <Provider store={store}>
//         <Index />
//       </Provider>
//     );

//     expect(subject.find("Layout")).toHaveLength(1);
//   });
// });

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import client, { session, useSession } from "next-auth/client";
import configureStore from "redux-mock-store";
import { initialState as infoState } from "../lib/reducers/information-block";
import { initialState as expState } from "../lib/reducers/experience-block";
import { initialState as educState } from "../lib/reducers/education-block";
import { initialState as skillsState } from "../lib/reducers/skills-block";
import Dashboard from "../pages/dashboard";
import { rest } from "msw";
import { setupServer } from "msw/node";

const mockSession = {
  user: {
    image: null,
    name: "John",
    email: "john@email.com",
  },
  expires: new Date(),
};

const server = setupServer(
  ...[
    rest.get("/api/auth/session", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockSession));
    }),
  ]
);

// jest.mock("next-auth/client");

xdescribe("Omega", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  // beforeEach(async function () {
  //   fetchMock.resetMocks();
  //   fetchMock.dontMock();
  // });
  it("Works", async () => {
    // fetchMock.mockResponseOnce(
    //   JSON.stringify({
    //     expires: "1",
    //     user: { email: "a", name: "Delta", image: "c" },
    //   })
    // );
    const middlewares = [];
    const mockStore = configureStore(middlewares);

    // Initialize mockstore with empty state
    const initialState = {
      basics: {
        fullPreview: false,
      },
      info: infoState,
      experience: expState,
      education: educState,
      skills: skillsState,
    };
    const store = mockStore(initialState);

    // (client.useSession as jest.Mock).mockReturnValueOnce(() => [
    //   mockSession,
    //   false,
    // ]);

    render(
      <ReduxProvider store={store}>
        <Dashboard />
      </ReduxProvider>
    );

    expect(screen.getByText("mis cvs guardados")).toBeInTheDocument();
  });
});
