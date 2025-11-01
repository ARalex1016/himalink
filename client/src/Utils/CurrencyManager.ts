import axios from "axios";

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

export interface ConversionResult {
  success: boolean;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  exchangeRate: number;
}

export const convertCurrency = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<ConversionResult | null> => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
    );

    if (response.data.result === "success") {
      const { conversion_rate } = response.data;
      const convertedAmount = amount * conversion_rate;

      return {
        success: true,
        fromCurrency,
        toCurrency,
        amount,
        convertedAmount,
        exchangeRate: conversion_rate,
      };
    } else {
      console.error("Error:", response.data.error);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
};
