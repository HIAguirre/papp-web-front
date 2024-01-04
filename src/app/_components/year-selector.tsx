import { DateTime } from "luxon";
import React, { ChangeEventHandler, useState } from "react";

type YearSelectorProps = {
  year?: number;
  setSelectedYear: (year?: any) => void;
};

export const YearSelector = ({ year, setSelectedYear }: YearSelectorProps) => {
  const currentYear = DateTime.now().year;

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div className="justify-around">
      <label htmlFor="year-select" className="text-2xl mx-4">
        Año
      </label>
      <select
        className="p-2 text-black rounded"
        id="year-select"
        value={year}
        onChange={handleYearChange}
      >
        <option value={undefined}></option>
        {Array.from({ length: 20 }, (_, i) => currentYear - i).map((year) => {
          if (year < 2022) return null;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default YearSelector;
