export const formatCurrency = (value: string) => {
  value = value.replace(/\D/g, "");
  value = (Number(value) / 100).toFixed(2) + "";
  value = value.replace(".", ",");
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return "R$ " + value;
}

export const parseMoney = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
};

export const formatCurrencyToNumber = (value: string) => {
  value = value
    .replace(/\./g, "")
    .replace("R$ ", "")
    .replace(/,/g, ".")

  return Number(value);
}