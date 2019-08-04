import { lnrpc } from "../../proto/proto";

export const getTransactions = jest.fn(async (): Promise<lnrpc.TransactionDetails> => {
  const response = await lnrpc.TransactionDetails.create({
    transactions: [],
  });
  return response;
});

export const newAddress = jest.fn(async (type: lnrpc.AddressType = lnrpc.AddressType.WITNESS_PUBKEY_HASH): Promise<lnrpc.NewAddressResponse> => {
  const response = lnrpc.NewAddressResponse.create({ address: "tb1qsl4hhqs8skzwknqhwjcyyyjepnwmq8tlcd32m3" });
  return response;
});

export const walletBalance = jest.fn(async (): Promise<lnrpc.WalletBalanceResponse> => {
  const response = lnrpc.WalletBalanceResponse.create({
    confirmedBalance: 0,
    totalBalance: 0,
    unconfirmedBalance: 0,
  });
  return response;
});

export const sendCoins = jest.fn(async (address: string, sat: number): Promise<lnrpc.SendCoinsResponse> => {
  const response = lnrpc.SendCoinsResponse.create({
    txid: "7836ca1453ef598b989a09496f48be17e14950a44e6ab2526b4a7fc17f9e4591"
  });
  return response;
});
