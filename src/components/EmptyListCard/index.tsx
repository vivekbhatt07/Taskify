import { FC, ReactNode } from "react";

type EmptyListCardType = {
  children: ReactNode;
};

const EmptyListCard: FC<EmptyListCardType> = ({ children }) => {
  return <div className="text-center">{children}</div>;
};

export default EmptyListCard;
