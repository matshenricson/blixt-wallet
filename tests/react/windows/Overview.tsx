import React from "react";
import { render, toJSON } from "@testing-library/react-native";
import { createStore, StoreProvider } from "easy-peasy";

import Overview from "../../../src/windows/Overview";
import { model } from "../../../src/state/index";
import LndMobile from "../../../src/state/LndMobileInjection";

const setupStore = (initialState: any) => createStore(model, {
  injections: {
    lndMobile: LndMobile,
  },
  initialState,
});

it("renders correctly", () => {
  const store = setupStore({
    lightning: {
      balance: 123,
    },
  });

  const { container } = render(
    <StoreProvider store={store}>
      <Overview />
    </StoreProvider>
  );
  expect(toJSON(container)).toMatchSnapshot();
});
