import { FC, ReactNode, useState } from "react";
import { TolltipIconAction } from "../../../../components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ModalProvider } from "../../../../components";
import TaskForm from "../../../../components/TaskForm";
import { Chip } from "@mui/material";

interface TaskCardProps {
  children?: ReactNode;
  taskData: {
    title: String;
    description: String;
    dueDate: String;
    priority: "Low" | "Medium" | "High";
    labels: String[];
  };
}

const TaskCard: FC<TaskCardProps> = ({ children, taskData }) => {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] =
    useState<Boolean>(false);

  const openEditTaskModal = () => setIsEditTaskModalOpen(true);
  const closeEditTaskModal = () => setIsEditTaskModalOpen(false);

  let priorityColor;

  switch (taskData?.priority) {
    case "Low":
      priorityColor = "#15803d";
      break;
    case "Medium":
      priorityColor = "#b45309";
      break;
    case "High":
      priorityColor = "#f87171";
  }

  return (
    <div className="bg-700 p-4 rounded-lg flex flex-col gap-1 items-start relative">
      <ModalProvider
        isOpen={isEditTaskModalOpen}
        title="Edit Task"
        OpenAction={
          <TolltipIconAction
            title="Edit Task"
            position="right"
            // className="absolute right-0 top-0"
            onClick={() => {
              openEditTaskModal();
            }}
          >
            <MoreVertIcon />
          </TolltipIconAction>
        }
        closeModal={closeEditTaskModal}
      >
        <TaskForm closeAction={closeEditTaskModal} isEdit />
      </ModalProvider>

      <h3 className="text-lg">{taskData?.title}</h3>
      <p className="text-sm">{taskData?.description}</p>
      <div>{taskData?.dueDate}</div>
      <div
        style={{ backgroundColor: priorityColor }}
        className="rounded-full py-[2px] px-3 inline-block text-sm"
      >
        {taskData?.priority}
      </div>
      <div className="flex flex-wrap gap-2">
        {taskData?.labels.map((label, index) => {
          return <Chip key={index} label={label} />;
        })}
      </div>
    </div>
  );
};

export default TaskCard;
