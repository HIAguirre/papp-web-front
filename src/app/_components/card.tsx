import React from "react";

type CardProps = {
  children: React.ReactNode;
};

export const Card = ({ children }: CardProps) => {
  return (
    <div className="bg-gray-200 bg-opacity-5 p-4 rounded-lg my-6">
      {children}
    </div>
  );
};
