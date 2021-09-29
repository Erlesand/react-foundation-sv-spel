export const deposit = (amount) => ({
  type: "atm/deposit",
  payload: amount,
});

export const withdraw = (amount) => ({
  type: "atm/withdraw",
  payload: -amount,
});
