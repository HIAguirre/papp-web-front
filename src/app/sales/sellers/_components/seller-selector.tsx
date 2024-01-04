import { beautifyName } from "@/app/_gen/general";
import { SellerName } from "../page";

type SellerSelectorProps = {
  sellers: SellerName[];
  selectedSeller?: SellerName;
  setSelectedSeller: (seller: SellerName) => void;
};

export const SellerSelector = ({
  sellers,
  selectedSeller,
  setSelectedSeller,
}: SellerSelectorProps) => {
  const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const seller = sellers.find((seller) => seller._id === e.target.value);
    if (seller) setSelectedSeller(seller);
  };

  return (
    <div className="justify-around">
      <label htmlFor="year-select" className="text-2xl mx-4">
        Vendedor
      </label>
      <select
        className="p-2 text-black rounded"
        id="seller-select"
        value={selectedSeller?._id}
        onChange={handleSelected}
      >
        <option value={undefined}></option>
        {sellers.map((seller) => {
          return (
            <option key={seller._id} value={seller._id}>
              {beautifyName(seller.name)}
            </option>
          );
        })}
      </select>
    </div>
  );
};
