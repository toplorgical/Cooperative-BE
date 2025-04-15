export default function currencyFormat(
  amount: string | number,
  notation: "standard" | "scientific" | "engineering" | "compact" = "standard",
  fractionDigits: number = 2
) {
  amount = Number(amount || 0);

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    notation,
    currency: "NGN",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}
