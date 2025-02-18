import React, { FC, useMemo } from "react";

const loadingConfigByType = {
  fullScreen: { width: "100vw", height: "100vh" },
  default: { width: "100%", height: "100%" },
};
export type loadingType = keyof typeof loadingConfigByType;

interface Props {
  isLoading: boolean;
  type?: loadingType;
  widthPx?: number;
  heightPx?: number;
  bgColor?: string;
  label?: string;
  cls?: string;
}

export const Loading: FC<Props> = ({
  isLoading = false,
  type = "default",
  widthPx,
  heightPx,
  bgColor = "bg-white",
  label,
  cls,
}) => {
  const { width, height } = useMemo(() => {
    const width = widthPx ?? loadingConfigByType[type].width;
    const height = heightPx ?? loadingConfigByType[type].height;
    return { width, height };
  }, [widthPx, heightPx]);
  return (
    <div
      className={`absolute z-50 flex items-center justify-center ${bgColor}`}
      style={{ width, height, display: isLoading ? undefined : "none" }}
    >
      <div className="inline-flex flex-col items-center gap-5">
        <div
          className={`h-12 w-12 animate-spin rounded-full border-[6px] border-r-primary-500 border-t-primary-500 border-b-default-100 border-l-default-100 ${cls}`}
        />
        {label && (
          <p className="font-sans text-b5-regular text-default-700">{label}</p>
        )}
      </div>
    </div>
  );
};
