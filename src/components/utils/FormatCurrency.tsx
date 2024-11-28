export const formateCurrency = (price: number, symbol: string) => {
  let res = `${symbol}${new Intl.NumberFormat().format(price)}`;

  if (price % 1 === 0) {
    res = res + ".00";
  }

  return res;
};

export const formateCurrencyWithoutSymbol = (price: number) => {
  return new Intl.NumberFormat().format(price);
};

export const rawCurrencyValue = (val) => {
  const rawValue = val.replace(/[^\d.]/g, "");
  return rawValue;
};
