import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  extraClasses?: string;
}

const FullHeightContainer: React.FC<ContainerProps> = ({ children, extraClasses }) => {
  return <div className={`fill-height ${extraClasses}`}>{children}</div>;
};

export default FullHeightContainer;
