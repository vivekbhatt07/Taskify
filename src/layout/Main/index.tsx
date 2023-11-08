import { FC, ReactNode } from "react";

const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export default Main;
