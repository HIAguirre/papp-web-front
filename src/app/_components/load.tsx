import Image from "next/image";
import React from "react";

type LoadProps = {
  height: number;
  width: number;
};

export const Load = ({ height, width }: LoadProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        className="animate-spin"
        src="/spinner-solid.svg"
        alt="Loading Spinner"
        height={height}
        width={width}
      />
    </div>
  );
};

export default Load;
