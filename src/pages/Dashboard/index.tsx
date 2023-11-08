import { FC } from "react";
import { IconButton, TextButton, TolltipIconAction } from "../../components";
import AddIcon from "@mui/icons-material/Add";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <div className="text-xl m-6">
      <TextButton>Click</TextButton>
      <TolltipIconAction position="top">
        <AddIcon />
      </TolltipIconAction>
    </div>
  );
};

export default Dashboard;
