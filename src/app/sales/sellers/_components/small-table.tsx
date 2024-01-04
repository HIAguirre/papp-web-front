import { formatCurrencyPercentage } from "@/app/_gen/general";

type SmallTableProps = {
  data: number[];
  labels: string[];
  format?: "currency" | "percentage";
};

export const SmallTable = ({ data, labels, format }: SmallTableProps) => {
  return (
    // Table
    <div className="mt-8 grid md:grid-cols-3 grid-cols-2 gap-x-12 gap-y-2 content-start">
      {data.map((datum, i) => {
        return (
          <div key={i} className="flex flex-row justify-between ">
            <p>{labels[i]}</p>
            <p>{formatCurrencyPercentage(datum, format)}</p>
          </div>
        );
      })}
    </div>
  );
};
