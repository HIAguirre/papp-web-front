"use client";
import { ReactNode, useState } from "react";
import Tabs, { Tab } from "../_components/tabs";

const SalesLayout = ({ children }: { children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState<Tab>();

  return (
    <div>
      <Tabs
        tabs={[
          {
            name: "Ejecutivos",
            link: "sellers",
          },
          {
            name: "Locaciones",
            link: "locations",
          },
          {
            name: "Clientes",
            link: "clients",
          },
        ]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {children}
    </div>
  );
};

export default SalesLayout;
