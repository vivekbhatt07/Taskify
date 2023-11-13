import { FC, ReactNode, useState } from "react";
import { TolltipIconAction } from "../../../../components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ModalProvider } from "../../../../components";
import TaskForm from "../../../../components/TaskForm";
import { Chip } from "@mui/material";
import { useTask } from "../../../../context";
import { Delete } from "@mui/icons-material";

interface TaskCardProps {
  children?: ReactNode;
  taskData: {
    _id?: string;
    title: string;
    description: string;
    dueDate: string;
    priority: "Low" | "Medium" | "High";
    labels: string[];
    variant: "ToDo" | "InProgress" | "Done";
  };
}

const TaskCard: FC<TaskCardProps> = ({ children, taskData }) => {
  const {
    deleteToDoTaskHandler,
    deleteInProgressTaskHandler,
    deleteDoneTaskHandler,
  } = useTask();
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] =
    useState<boolean>(false);

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
      <div className="flex justify-between">
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
          <TaskForm
            closeAction={closeEditTaskModal}
            isEdit
            taskData={taskData}
          />
        </ModalProvider>
        <TolltipIconAction
          title="Delete Task"
          position="right"
          onClick={() => {
            if (taskData.variant === "ToDo") {
              deleteToDoTaskHandler(taskData._id);
            } else if (taskData.variant === "InProgress") {
              deleteInProgressTaskHandler(taskData._id);
            } else if (taskData.variant === "Done") {
              deleteDoneTaskHandler(taskData._id);
            }
          }}
        >
          <Delete />
        </TolltipIconAction>
      </div>
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
        {taskData?.labels?.map((label, index) => {
          return <Chip key={index} label={label} />;
        })}
      </div>
    </div>
  );
};

export default TaskCard;
