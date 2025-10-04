import { useEffect, useState } from "react";

// Utils
import { convertCurrency } from "./../Utils/CurrencyManager";

interface CurrencyDisplayProps {
  amount: number;
  fromCur: string;
  toCur?: string;
}

interface AmountWithCurrencyProps {
  amount: number | string;
  currency: string;
}

export const AmountWithCurrency = ({
  amount,
  currency,
}: AmountWithCurrencyProps) => {
  return (
    <p className="text-xl text-accent/75 font-medium">
      {amount} <span className="text-xs">{currency}</span>
    </p>
  );
};

const CurrencyDisplay = ({
  amount,
  fromCur,
  toCur = "USD",
}: CurrencyDisplayProps) => {
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);

  useEffect(() => {
    if (amount && amount > 0 && toCur) {
      const fetchConversion = async () => {
        try {
          let result = await convertCurrency(fromCur, toCur, amount);

          setConvertedAmount(result?.convertedAmount?.toFixed(2) || null);
        } catch (error: any) {
          console.log(error?.message);
        }
      };

      fetchConversion();
    }
  }, [amount, fromCur]);

  return (
    <div className="flex flex-row justify-around">
      <AmountWithCurrency amount={amount} currency={fromCur} />

      {convertedAmount && (
        <>
          <p>=</p>

          <AmountWithCurrency amount={convertedAmount} currency={toCur} />
        </>
      )}
    </div>
  );
};

export default CurrencyDisplay;
