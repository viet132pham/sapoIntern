const handleCurrency = (amount) => {
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };
  const formated = new Intl.NumberFormat("vi-VN", config).format(amount);
  return formated;
};

export default handleCurrency;
