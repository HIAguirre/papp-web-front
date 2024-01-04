"use client";

import { useEffect, useState } from "react";
import { beautifyName, months, transpose } from "../_gen/general";
import { Card } from "@/app/_components/card";
import { BarChart } from "./_components/chart";
import { DataVisualization } from "@/app/_components/data-visualization";
import Table from "@/app/_components/table";
import { getSellerCharts, getSellerNames } from "./actions";
import { ErrorDialog } from "../_components/error.dialog";
import YearSelector from "@/app/_components/year-selector";
import { DateTime } from "luxon";
import Load from "../_components/load";
import { useRouter } from "next/navigation";

export type SellerDashboardData = {
  sellerId: string;
  data: SellerData;
};

type SellerData = {
  goals: number[];
  clients: number[];
  visits: number[];
  cash: number[];
  totalMonth: number[];
  totalLastYear: number[];
  lateClients: number[];
  scores: number[];
};

type ParsedSellerData = {
  topLabels: string[];
  leftLabels: string[];
  goals: number[][];
  clients: number[][];
  visits: number[][];
  cash: number[][];
  totalMonth: number[][];
  totalLastYear: number[][];
  lateClients: number[][];
  scores: number[][];
};

const parseSellersRes = (data: SellerDashboardData[]): ParsedSellerData => {
  const parsedInvertedData = data.reduce((acc, curr, i) => {
    acc.topLabels = [...(acc.topLabels ?? []), curr.sellerId];
    acc.goals = [...(acc.goals ?? []), curr.data.goals];
    acc.clients = [...(acc.clients ?? []), curr.data.clients];
    acc.visits = [...(acc.visits ?? []), curr.data.visits];
    acc.cash = [...(acc.cash ?? []), curr.data.cash];
    acc.totalMonth = [...(acc.totalMonth ?? []), curr.data.totalMonth];
    acc.totalLastYear = [...(acc.totalLastYear ?? []), curr.data.totalLastYear];
    acc.lateClients = [...(acc.lateClients ?? []), curr.data.lateClients];
    acc.scores = [...(acc.scores ?? []), curr.data.scores];
    return acc;
  }, {} as ParsedSellerData);

  return {
    topLabels: parsedInvertedData.topLabels,
    leftLabels: months ?? [],
    goals: transpose(parsedInvertedData.goals),
    clients: transpose(parsedInvertedData.clients),
    visits: transpose(parsedInvertedData.visits),
    cash: transpose(parsedInvertedData.cash),
    totalMonth: transpose(parsedInvertedData.totalMonth),
    totalLastYear: transpose(parsedInvertedData.totalLastYear),
    lateClients: transpose(parsedInvertedData.lateClients),
    scores: transpose(parsedInvertedData.scores),
  };
};

const parseNames = (data: { _id: string; name: string }[]) => {
  return data.reduce((acc, curr) => {
    acc[curr._id] = beautifyName(curr.name);
    return acc;
  }, {} as { [key: string]: string });
};

const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState<SellerDashboardData[]>([]);
  const [names, setNames] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [year, setYear] = useState();
  const [sellers, setSellers] = useState([
    "DHA",
    "ORM",
    "GGM",
    "HMO",
    "JCR",
    "LEOH",
    "LAD",
    "OAC",
    "JMVP",
  ]);

  useEffect(() => {
    const getData = async () => {
      if (!year) return;
      setLoading(true);
      console.log("getting data");
      const names = await getSellerNames();
      if (names?.status === 403) router.push("/auth");
      if (names?.data) setNames(parseNames(names.data));
      const charts = await getSellerCharts(year, sellers);
      if (charts?.status === 403) router.push("/auth");
      if (charts.success && charts.data) setData(charts.data);
      else setError(charts.error);
      setLoading(false);
    };
    getData();
  }, [setData, setError, year, sellers]);

  const parsedData = parseSellersRes(data);

  const parsedNames = parsedData?.topLabels?.map(
    (sellerId) => names?.[sellerId]
  );

  if (error)
    return (
      <>
        <YearSelector year={year} setSelectedYear={setYear} />
        <ErrorDialog text={JSON.stringify(error, null, 2)} />
      </>
    );

  if (!year) return <YearSelector year={year} setSelectedYear={setYear} />;

  if (loading)
    return (
      <>
        <YearSelector year={year} setSelectedYear={setYear} />
        <Load height={128} width={128} />
      </>
    );

  return (
    <div>
      <YearSelector year={year} setSelectedYear={setYear} />
      {/* -----------------Calificacion---------------------- */}
      <Card>
        <DataVisualization title="Calificacion" year={year}>
          <BarChart data={parsedData.scores} labels={parsedNames} />
          <Table
            data={parsedData.scores}
            topLabels={parsedNames}
            leftLabels={parsedData.leftLabels}
          />
        </DataVisualization>
      </Card>
      {/* -----------------Total vs meta---------------------- */}
      <Card>
        <DataVisualization title="Total vs meta" year={year}>
          <BarChart data={parsedData.goals} labels={parsedNames} />
          <Table
            data={parsedData.goals}
            topLabels={parsedNames}
            leftLabels={parsedData.leftLabels}
            format="percentage"
          />
        </DataVisualization>
      </Card>
      {/* -----------------Total vs mes anterior---------------------- */}
      <Card>
        <DataVisualization title="Total vs mes anterior" year={year}>
          <BarChart data={parsedData.totalMonth} labels={parsedNames} />
          <Table
            data={parsedData.totalMonth}
            topLabels={parsedNames}
            leftLabels={parsedData.leftLabels}
            format="percentage"
          />
        </DataVisualization>
      </Card>
      {/* -----------------Total vs año anterior---------------------- */}
      <Card>
        <DataVisualization title="Total vs año anterior" year={year}>
          <BarChart data={parsedData.totalLastYear} labels={parsedNames} />
          <Table
            data={parsedData.totalLastYear}
            topLabels={parsedNames}
            leftLabels={parsedData.leftLabels}
            format="percentage"
          />
        </DataVisualization>
      </Card>
      {/* -----------------Total efectivo---------------------- */}
      <Card>
        <DataVisualization title="Total en efectivo" year={year}>
          <BarChart data={parsedData.cash} labels={parsedNames} />
          <Table
            data={parsedData.cash}
            topLabels={parsedNames}
            leftLabels={parsedData.leftLabels}
            format="percentage"
          />
        </DataVisualization>
      </Card>
      {/* -----------------Total clientes---------------------- */}
      <Card>
        <DataVisualization title="Clientes" year={year}>
          <BarChart data={parsedData.clients} labels={parsedNames} />
          <Table
            data={parsedData.clients}
            topLabels={parsedNames}
            leftLabels={parsedData.leftLabels}
          />
        </DataVisualization>
      </Card>
      {/* -----------------Clientes atrasados---------------------- */}
      <Card>
        <DataVisualization title="Clientes atrasados" year={year}>
          <BarChart data={parsedData.lateClients} labels={parsedNames} />
          <Table
            data={parsedData.lateClients}
            topLabels={parsedNames}
            leftLabels={parsedData.leftLabels}
          />
        </DataVisualization>
      </Card>
      {/* -----------------Visitas---------------------- */}
      <Card>
        <DataVisualization title="Visitas" year={year}>
          <BarChart data={parsedData.visits} labels={parsedNames} />
          <Table
            data={parsedData.visits}
            topLabels={parsedNames}
            leftLabels={parsedData.leftLabels}
          />
        </DataVisualization>
      </Card>
    </div>
  );
};

export default Dashboard;
