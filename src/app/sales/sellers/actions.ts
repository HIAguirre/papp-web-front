"use server";
import { logout } from "@/app/actions";
import { cookies } from "next/headers";

export const getSingleSellerCharts = async (
  year: number,
  seller: string
): Promise<{
  success: boolean;
  data?: any;
  error?: any;
  status?: number;
}> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  const response = await fetch(
    `${process.env.API}/newMetrics/seller/yearly/${seller}/${year}`,
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
