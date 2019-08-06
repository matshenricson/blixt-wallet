jest.mock("react-native-camera", () => require("./mocks/react-native-camera"));
jest.mock("@react-native-community/async-storage", () => require("./mocks/@react-native-community/async-storage"));
jest.mock('react-native-sqlite-storage', () => require("./mocks/react-native-sqlite-storage"));

jest.mock("./src/lndmobile/index", () => require("./mocks/lndmobile/index"));
jest.mock("./src/lndmobile/wallet", () => require("./mocks/lndmobile/wallet"));
jest.mock("./src/lndmobile/channel", () => require("./mocks/lndmobile/channel"));
jest.mock("./src/lndmobile/onchain", () => require("./mocks/lndmobile/onchain"));
