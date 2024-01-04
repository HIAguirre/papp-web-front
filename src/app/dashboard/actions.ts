"use server";

import { cookies } from "next/headers";
import { SellerDashboardData } from "./page";
import { logout } from "../actions";

export const getSellerCharts = async (
  year: number,
  sellers: string[]
): Promise<{
  success: boolean;
  data?: SellerDashboardData[];
  error?: any;
  status?: number;
}> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  const response = await fetch(
    `${
      process.env.API
    }/newMetrics/seller/yearly/all/${year}?sellers=${sellers.join(",")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ?? "",
      },
    }
  );
  console.log(response.url);
  const data = await response.json();
  if (response.status === 403) logout();
  if (response.ok) {
    return {
      success: true,
      data,
      error: undefined,
      status: response.status,
    };
  }
  return {
    success: false,
    error: data,
    data: undefined,
    status: response.status,
  };
};

export const getSellerNames = async (): Promise<{
  success: boolean;
  data?: any;
  error?: any;
  status?: number;
}> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  const response = await fetch(`${process.env.API}/sellers/names`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token ?? "",
    },
  });
  console.log(response.url);
  const data = await response.json();
  if (response.status === 403) logout();
  if (response.ok) {
    return {
      success: true,
      data,
      error: undefined,
      status: response.status,
    };
  }
  return {
    success: false,
    error: data,
    data: undefined,
    status: response.status,
  };
};
