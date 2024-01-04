export type StandarResponse<T> = {
  success: boolean;
  data?: T;
  error?: any;
  status?: number;
};

export type SingleSellerChartsResponse = {
  goals: number[];
  clients: number[];
  visits: number[];
  cash: number[];
  totalMonth: number[];
  totalLastYear: number[];
  scores: number[];
  lateClients: number[];
};
