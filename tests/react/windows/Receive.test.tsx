import React from "react";
import { act, render, toJSON, fireEvent, wait, waitForElement } from "@testing-library/react-native";
import { createStore, StoreProvider } from "easy-peasy";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { setupApp, setItemObject, StorageItem } from "../../../src/storage/app";

import Receive from "../../../src/windows/Receive";
import { model } from "../../../src/state/index";
import LndMobile from "../../../src/state/LndMobileInjection";

import { getInfo } from "../../../src/lndmobile/index";

const RootStack = createSwitchNavigator({
  Receive,
}, {
  initialRouteName: "Receive",
});

const AppContainer = createAppContainer(RootStack);

const setupStore = (initialState?: any) => createStore(model, {
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

  const { container, unmount } = render(
    <StoreProvider store={store}>
      <AppContainer />
    </StoreProvider>
  );
  expect(toJSON(container)).toMatchSnapshot();

  unmount();
});

it("is possible to create an invoice and go to the QR screen", async () => {
  await setupApp(); // TODO do we need to clear?
  await setItemObject(StorageItem.firstSync, false);
  await setItemObject(StorageItem.walletCreated, true);

  const store = setupStore();
  await store.getActions().initializeApp(undefined);
  await store.getActions().lightning.initialize(undefined);
  store.getActions().channel.setBalance(123);

  const { queryByTestId, unmount } = render(
    <StoreProvider store={store}>
      <AppContainer />
    </StoreProvider>
  );

  const inputAmountSat = queryByTestId("input-amount-sat");
  const inputMessage = queryByTestId("input-message");
  const createInvoiceButton = await waitForElement(() => queryByTestId("create-invoice"));

  expect(createInvoiceButton).not.toBeNull();
  expect(inputAmountSat).not.toBeNull();
  expect(inputMessage).not.toBeNull();

  act(() => void fireEvent.changeText(inputAmountSat!, "1000"));
  expect(inputAmountSat!.props.value).toBe("1000");
  act(() => void fireEvent.changeText(inputMessage!, "A test invoice"));
  expect(inputMessage!.props.value).toBe("A test invoice");

  // Pressing createInvoiceButton moves us
  // to the next window, from ReceiveSetup.tsx to ReceiveQr.tsx
  act(() => void fireEvent.press(createInvoiceButton!));

  await wait(() => expect(store.getState().transaction.transactions).toHaveLength(1));
  const paymentRequestString = await waitForElement(() => queryByTestId("payment-request-string"));
  const expireString = await waitForElement(() => queryByTestId("expire"));
  const payAmountString = await waitForElement(() => queryByTestId("pay-amount"));

  expect(paymentRequestString).not.toBeNull();
  expect(expireString!.children.join()).toContain("Expires in");
  expect(payAmountString!.children.join()).toContain("1000");

  unmount();
});
