type DataVisualizationProps = {
  title: string;
  year: number;
  children: React.ReactNode[];
};

export const DataVisualization = ({
  title,
  year,
  children,
}: DataVisualizationProps) => {
  return (
    <>
      <div className="flex flex-row justify-between mx-4 mb-4">
        <p className="mx-4 text-3xl">{title}</p>
        <p className="mx-4 text-3xl">{year}</p>
      </div>
      {children}
    </>
  );
};
