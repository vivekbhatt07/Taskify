import { FC, ReactNode, useState } from "react";
import IconAction from "../../../../components/buttons/IconAction";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ModalProvider } from "../../../../components";
import TaskForm from "../../../../components/TaskForm";

interface TaskCardProps {
  children?: ReactNode;
  title: String;
  description: String;
  dueDate: String;
  priority: "Low" | "Medium" | "High";
  labels: String[];
}

const TaskCard: FC<TaskCardProps> = ({
  children,
  title,
  description,
  dueDate,
  priority,
  labels,
}) => {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] =
    useState<Boolean>(false);

  const openEditTaskModal = () => setIsEditTaskModalOpen(true);
  const closeEditTaskModal = () => setIsEditTaskModalOpen(false);

  let priorityColor;

  switch (priority) {
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
          <IconAction
            className="absolute right-0 top-0"
            onClick={() => {
              setIsEditTaskModalOpen(true);
            }}
          >
            <MoreVertIcon />
          </IconAction>
        }
        closeModal={closeEditTaskModal}
      >
        <TaskForm />
      </ModalProvider>

      <h3 className="text-lg">{title}</h3>
      <p className="text-sm">{description}</p>
      <div>{dueDate}</div>
      <div
        style={{ backgroundColor: priorityColor }}
        className="rounded-full py-[2px] px-3 inline-block text-sm"
      >
        {priority}
      </div>
      <div className="flex flex-wrap gap-2">
        {labels.map((label, index) => {
          return (
            <div key={index} className="bg-[]">
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskCard;
