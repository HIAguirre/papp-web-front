import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type TabsProps = {
  tabs: Tab[];
  selectedTab?: Tab;
  setSelectedTab: (tab: Tab) => void;
};

export type Tab = {
  name: string;
  link: string;
};

const Tabs = ({ tabs, selectedTab, setSelectedTab }: TabsProps) => {
  const pathname = usePathname();
  const lastpath = pathname.split("/").slice(-1)[0];

  return (
    <div className="flex justify-around justify-items-center pb-4 border-b">
      {tabs.map((tab, index) => {
        return (
          <div key={index} className="flex">
            <Link
              className={`bg-white py-3 lg:px-12 md:px-8 px-6 rounded-lg ${
                lastpath === tab.link
                  ? "text-black"
                  : "text-gray-500 opacity-25"
              }`}
              href={
                pathname.split("/").length > 2 ? tab.link : "sales/" + tab.link
              }
            >
              <p className="text-black text-xl">{tab.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
