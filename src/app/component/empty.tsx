import React, { FC } from "react";

export interface Props {}
export const Empty: FC<Props> = () => {
  return (
    <p className="flex text-gray-400 justify-center items-center text-lg font-bold h-60">
      No data to display.
    </p>
  );
};
