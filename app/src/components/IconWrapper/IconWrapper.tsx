import React from "react";

interface LogoWrapperProps {
  width: string;
  height: string;
  viewBox: string;
  children: React.ReactNode;
  fillColor?: string;
}

const IconWrapper: React.FC<LogoWrapperProps> = ({
  width,
  height,
  viewBox,
  children,
  fillColor,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default IconWrapper;
