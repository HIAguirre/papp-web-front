"use client";

import { getSellerNames } from "@/app/dashboard/actions";
import { useEffect, useState } from "react";
import { SellerSelector } from "./_components/seller-selector";
import YearSelector from "@/app/_components/year-selector";
import { getSingleSellerCharts } from "./actions";
import {
  SingleSellerChartsResponse,
  StandarResponse,
} from "@/app/_gen/response.types";
import { ErrorDialog } from "@/app/_components/error.dialog";
import Load from "@/app/_components/load";
import { Card } from "@/app/_components/card";
import { DataVisualization } from "@/app/_components/data-visualization";
import { BarChart } from "./_components/chart";
import { months } from "@/app/_gen/general";
import { SmallTable } from "./_components/small-table";

export type SellerName = {
  _id: string;
  name: string;
};

const Sellers = () => {
  const [names, setNames] = useState<SellerName[]>([]);
  const [selectedName, setSelectedName] = useState<SellerName>();
  const [year, setYear] = useState<number>();
  const [charts, setCharts] =
    useState<StandarResponse<SingleSellerChartsResponse>>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNames = async () => {
      const names = await getSellerNames();
      if (names.success) setNames(names.data);
    };
    fetchNames();
  }, [setNames]);

  useEffect(() => {
    const fetchCharts = async (id: string, year: number) => {
      setLoading(true);
      const charts = await getSingleSellerCharts(year, id);
      setCharts(charts);
      setLoading(false);
    };

    if (selectedName && year) fetchCharts(selectedName._id, year);
  }, [selectedName, year]);

  const selectors = (
    <div className="flex flex-row justify-around my-8">
      <SellerSelector
        sellers={names}
        selectedSeller={selectedName}
        setSelectedSeller={setSelectedName}
      />
      <YearSelector year={year} setSelectedYear={setYear} />
    </div>
  );

  if (charts?.error)
    return (
      <>
        {selectors}
        <ErrorDialog text={charts.error} />
      </>
    );

  if (loading)
    return (
      <>
        {selectors}
        <Load height={300} width={300} />;
      </>
    );

  if (!selectedName || !year) return selectors;

  return (
    <div className="my-8">
      {selectors}
      {/* ---------------------------Scores-------------------------- */}
      <Card>
        <DataVisualization title="Calificacion" year={year}>
          <BarChart data={[charts?.data?.scores ?? []]} labels={months} />
          <SmallTable data={charts?.data?.scores ?? []} labels={months} />
        </DataVisualization>
      </Card>
      {/* ---------------------------Total vs goals-------------------------- */}
      <Card>
        <DataVisualization title="Total vs meta" year={year}>
          <BarChart data={[charts?.data?.goals ?? []]} labels={months} />
          <SmallTable
            data={charts?.data?.goals ?? []}
            labels={months}
            format="percentage"
          />
        </DataVisualization>
      </Card>
      {/* ---------------------------Total vs last month-------------------------- */}
      <Card>
        <DataVisualization title="Total vs mes anterior" year={year}>
          <BarChart data={[charts?.data?.totalMonth ?? []]} labels={months} />
          <SmallTable
            data={charts?.data?.totalMonth ?? []}
            labels={months}
            format="percentage"
          />
        </DataVisualization>
      </Card>
      {/* ---------------------------Total vs last year-------------------------- */}
      <Card>
        <DataVisualization title="Total vs año anterior" year={year}>
          <BarChart
            data={[charts?.data?.totalLastYear ?? []]}
            labels={months}
          />
          <SmallTable
            data={charts?.data?.totalLastYear ?? []}
            labels={months}
            format="percentage"
          />
        </DataVisualization>
      </Card>
      {/* --------------------------- Cash -------------------------- */}
      <Card>
        <DataVisualization title="Ventas en efectivo" year={year}>
          <BarChart data={[charts?.data?.cash ?? []]} labels={months} />
          <SmallTable
            data={charts?.data?.cash ?? []}
            labels={months}
            format="percentage"
          />
        </DataVisualization>
      </Card>
      {/* --------------------------- Clients -------------------------- */}
      <Card>
        <DataVisualization title="Clientes" year={year}>
          <BarChart data={[charts?.data?.clients ?? []]} labels={months} />
          <SmallTable data={charts?.data?.clients ?? []} labels={months} />
        </DataVisualization>
      </Card>
      {/* --------------------------- Late clients -------------------------- */}
      <Card>
        <DataVisualization title="Clientes atrasados" year={year}>
          <BarChart data={[charts?.data?.lateClients ?? []]} labels={months} />
          <SmallTable data={charts?.data?.lateClients ?? []} labels={months} />
        </DataVisualization>
      </Card>
      {/* --------------------------- Visits -------------------------- */}
      <Card>
        <DataVisualization title="Visitas" year={year}>
          <BarChart data={[charts?.data?.visits ?? []]} labels={months} />
          <SmallTable data={charts?.data?.visits ?? []} labels={months} />
        </DataVisualization>
      </Card>
    </div>
  );
};

export default Sellers;
