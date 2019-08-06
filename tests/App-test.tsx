import React from "react";
import { render, toJSON } from "@testing-library/react-native";

import App from "../src/App";

import { advanceBy, advanceTo, clear } from "jest-date-mock";
advanceTo(new Date(2019, 0, 1, 1, 0, 0));

it("renders correctly", () => {
  const { container } = render(<App />);
  expect(toJSON(container)).toMatchSnapshot();
});
