import { FC, useState } from "react";
import { IconButton, TolltipIconAction, ModalProvider } from "../../components";
import { PageContainer } from "../../layout";
import { TaskCard, TaskColumn } from "./components";
import { Add } from "@mui/icons-material";
import TaskForm from "../../components/TaskForm";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<Boolean>(false);

  const openAddTaskModal = () => setIsAddTaskModalOpen(true);
  const closeAddTaskModal = () => setIsAddTaskModalOpen(false);

  const dashboardGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  };

  return (
    <PageContainer>
      <></>
    </PageContainer>
  );
};

export default Dashboard;
