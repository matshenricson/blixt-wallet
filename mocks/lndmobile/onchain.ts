import { lnrpc } from "../../proto/proto";

// export const getTransactions = async (): Promise<lnrpc.TransactionDetails> => {
//   const response = await sendCommand<lnrpc.IGetTransactionsRequest, lnrpc.GetTransactionsRequest, lnrpc.TransactionDetails>({
//     request: lnrpc.GetTransactionsRequest,
//     response: lnrpc.TransactionDetails,
//     method: "GetTransactions",
//     options: {},
//   });
//   return response;
// };

export const newAddress = async (type: lnrpc.AddressType = lnrpc.AddressType.WITNESS_PUBKEY_HASH): Promise<lnrpc.NewAddressResponse> => {
  const response = lnrpc.NewAddressResponse.create({ address: "tb1qsl4hhqs8skzwknqhwjcyyyjepnwmq8tlcd32m3" });
  return response;
};

// export const walletBalance = async (): Promise<lnrpc.WalletBalanceResponse> => {
//   const response = await sendCommand<lnrpc.IWalletBalanceRequest, lnrpc.WalletBalanceRequest, lnrpc.WalletBalanceResponse>({
//     request: lnrpc.WalletBalanceRequest,
//     response: lnrpc.WalletBalanceResponse,
//     method: "WalletBalance",
//     options: {},
//   });
//   return response;
// };
//
// export const sendCoins = async (address: string, sat: number): Promise<lnrpc.SendCoinsResponse> => {
//   const response = await sendCommand<lnrpc.ISendCoinsRequest, lnrpc.SendCoinsRequest, lnrpc.SendCoinsResponse>({
//     request: lnrpc.SendCoinsRequest,
//     response: lnrpc.SendCoinsResponse,
//     method: "SendCoins",
//     options: {
//       addr: address,
//       amount: sat,
//     },
//   });
//   return response;
// };
