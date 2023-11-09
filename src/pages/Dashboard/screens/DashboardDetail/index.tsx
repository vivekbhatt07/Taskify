import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IconButton,
  TolltipIconAction,
  ModalProvider,
} from "../../../../components";
import { PageContainer } from "../../../../layout";
import { TaskCard, TaskColumn } from "../../components";
import { Add } from "@mui/icons-material";
import TaskForm from "../../../../components/TaskForm";

interface DashboardDetailProps {}

const DashboardDetail: FC<DashboardDetailProps> = () => {
  const { projectId } = useParams();

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
      <div className="flex gap-2 relative" style={dashboardGridStyle}>
        <div className="absolute">
          <ModalProvider
            isOpen={isAddTaskModalOpen}
            title="Add Task"
            OpenAction={
              <TolltipIconAction
                title="Add Task"
                position="top"
                onClick={openAddTaskModal}
              >
                <Add />
              </TolltipIconAction>
            }
            closeModal={closeAddTaskModal}
          >
            <TaskForm closeAction={openAddTaskModal} />
          </ModalProvider>
        </div>
        <TaskColumn columnType="To Do" columnColor="#0891b2">
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Low"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Medium"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="High"
            labels={["easy", "style"]}
          />
        </TaskColumn>
        <TaskColumn columnType="In Progress" columnColor="#f59e0b">
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Low"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Medium"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="High"
            labels={["easy", "style"]}
          />
        </TaskColumn>
        <TaskColumn columnType="Done" columnColor="#16a34a">
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Low"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Medium"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="High"
            labels={["easy", "style"]}
          />
        </TaskColumn>
      </div>
    </PageContainer>
  );
};

export default DashboardDetail;
