import { useClientContext } from "@/app/contexts/clientContext";

export const formatToKwanza = (value: number,code: string): string => {
  const isValidCurrencyCode = /^[A-Z]{3}$/.test(code);
  if (!isValidCurrencyCode) {
    console.error('Código de moeda inválido:', code);
    return '$';
  }

  const formatter = new Intl.NumberFormat("pt-AO" || '', {
    style: "currency",
    currency: code,
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};

export const formatMoneyCart = (value: number): string => {
  const {client} = useClientContext()

  const isValidCurrencyCode = /^[A-Z]{3}$/.test(client.currencyClient?.code);
  if (!isValidCurrencyCode) {
    console.error('Código de moeda inválido:', client.currencyClient);
    return 'Erro na formatação';
  }

  const formatter = new Intl.NumberFormat('pt-AO', {
    style: "currency",
    currency: client.currencyClient.code,
    minimumFractionDigits: client.currencyClient.digits || 2,
  });
  return formatter.format(value);
};

