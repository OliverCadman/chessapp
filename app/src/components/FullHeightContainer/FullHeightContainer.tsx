import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const FullHeightContainer: React.FC<ContainerProps> = ({ children }) => {
  return <div className="fill-height">{children}</div>;
};

export default FullHeightContainer;
