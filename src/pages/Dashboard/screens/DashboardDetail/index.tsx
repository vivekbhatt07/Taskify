import { FC, useState, useEffect } from "react";
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
import { useProject, useTask } from "../../../../context";

interface DashboardDetailProps {}

const DashboardDetail: FC<DashboardDetailProps> = () => {
  const { state, getProjectDataHandler } = useTask();
  const { dispatch } = useProject();
  const { projectId } = useParams();

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<Boolean>(false);

  const openAddTaskModal = () => setIsAddTaskModalOpen(true);
  const closeAddTaskModal = () => setIsAddTaskModalOpen(false);

  const dashboardGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  };

  useEffect(() => {
    if (projectId) {
      dispatch({ type: "SET_PROJECT", payload: projectId });
      getProjectDataHandler(projectId);
    }
  }, [projectId]);

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
            <TaskForm closeAction={closeAddTaskModal} projectId={projectId} />
          </ModalProvider>
        </div>
        <TaskColumn columnType="To Do" columnColor="#0891b2">
          {state?.toDoList.map((task, index) => {
            return <TaskCard taskData={task} key={index} />;
          })}
        </TaskColumn>
        <TaskColumn columnType="In Progress" columnColor="#f59e0b">
          {state?.inProgressList.map((task, index) => {
            return <TaskCard taskData={task} key={index} />;
          })}
        </TaskColumn>
        <TaskColumn columnType="Done" columnColor="#16a34a">
          {state?.doneList.map((task, index) => {
            return <TaskCard taskData={task} key={index} />;
          })}
        </TaskColumn>
      </div>
    </PageContainer>
  );
};

export default DashboardDetail;
