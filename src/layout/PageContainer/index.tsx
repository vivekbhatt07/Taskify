import { FC, ReactNode } from "react";
import Header from "../Header";
import Main from "../Main";

const PageContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="dark:bg-900 min-h-screen dark:text-50 transition-all duration-300">
      <Header />
      <Main>{children}</Main>
    </div>
  );
};

export default PageContainer;
