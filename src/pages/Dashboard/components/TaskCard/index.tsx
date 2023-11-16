import { FC, ReactNode, useState } from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { TolltipIconAction } from "../../../../components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ModalProvider } from "../../../../components";
import TaskForm from "../../../../components/TaskForm";
import { Chip, Popover, Tooltip } from "@mui/material";
import { useTask } from "../../../../context";
import { Delete, More } from "@mui/icons-material";
import { Draggable } from "react-beautiful-dnd";
import { truncateString } from "../../../../utils";

interface TaskCardProps {
  index: number;
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

const TaskCard: FC<TaskCardProps> = ({ taskData, index }) => {
  const [isDetail, setIsDetail] = useState<boolean>(false);

  const handleDetailSwitch = () => {
    setIsDetail(!isDetail);
  };

  // Label Popup:

  const [labelEl, setLabelEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!event) return;
    setLabelEl(event.currentTarget);
  };

  const handleClose = () => {
    setLabelEl(null);
  };

  const open = Boolean(labelEl);
  const id = open ? "label-popover" : undefined;

  //

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      checked={isDetail}
      disableRipple
      onChange={handleDetailSwitch}
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#7c3aed" : "#7c3aed",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const {
    deleteToDoTaskHandler,
    deleteInProgressTaskHandler,
    deleteDoneTaskHandler,
  } = useTask();
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] =
    useState<boolean>(false);

  const openEditTaskModal = () => setIsEditTaskModalOpen(true);
  const closeEditTaskModal = () => setIsEditTaskModalOpen(false);

  let priorityColor: string;

  switch (taskData?.priority) {
    case "Low":
      priorityColor = "#15803d";
      break;
    case "Medium":
      priorityColor = "#fb923c";
      break;
    case "High":
      priorityColor = "#f87171";
  }

  return (
    // @ts-ignore
    <Draggable draggableId={taskData._id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`dark:bg-700 p-4 rounded-lg flex flex-col gap-2 items-start relative bg-50 ${
            snapshot.isDragging ? "dragging" : ""
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex justify-between items-center w-full">
            {isDetail && (
              <Tooltip title={taskData?.title}>
                <h3 className="text-base">
                  {truncateString(taskData?.title, 15)}
                </h3>
              </Tooltip>
            )}
            {!isDetail && (
              <h3 className="text-base">
                {truncateString(taskData?.title, 15)}
              </h3>
            )}
            <div className="flex gap-2 items-center">
              <Tooltip
                title={`${
                  isDetail
                    ? "Hide truncated details"
                    : "Show truncated details on hover"
                }`}
              >
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} />}
                  label={false}
                />
              </Tooltip>
              <TolltipIconAction
                title="Delete Task"
                position="left"
                iconBtnSx={{ width: "30px", height: "30px" }}
                onClick={() => {
                  if (!taskData._id) return;
                  if (taskData.variant === "ToDo") {
                    deleteToDoTaskHandler(taskData._id);
                  } else if (taskData.variant === "InProgress") {
                    deleteInProgressTaskHandler(taskData._id);
                  } else if (taskData.variant === "Done") {
                    deleteDoneTaskHandler(taskData._id);
                  }
                }}
              >
                <Delete sx={{ width: "20px", height: "20px" }} />
              </TolltipIconAction>
              <ModalProvider
                isOpen={isEditTaskModalOpen}
                title="Edit Task"
                OpenAction={
                  <TolltipIconAction
                    title="Edit Task"
                    position="right"
                    iconBtnSx={{ width: "30px", height: "30px" }}
                    onClick={() => {
                      openEditTaskModal();
                    }}
                  >
                    <MoreVertIcon sx={{ width: "20px", height: "20px" }} />
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
            </div>
          </div>
          <div className="flex gap-2 items-center mb-1">
            <div
              style={{ backgroundColor: priorityColor, color: "#fff" }}
              className="rounded-full py-[2px] px-3 flex text-xs items-center"
            >
              {taskData?.priority}
            </div>
            <div className="text-xs">{taskData?.dueDate}</div>
          </div>

          {isDetail && (
            <Tooltip title={taskData?.description} placement="right">
              <p className="text-xs mb-1">
                {truncateString(taskData?.description, 50)}
              </p>
            </Tooltip>
          )}
          {!isDetail && (
            <p className="text-xs mb-1">
              {truncateString(taskData?.description, 50)}
            </p>
          )}
          <div className="flex flex-wrap gap-2 items-center">
            {taskData?.labels?.slice(0, 3).map((label, index) => {
              return (
                <Chip key={index} label={label} sx={{ fontSize: "12px" }} />
              );
            })}
            {taskData?.labels?.length > 3 && (
              <TolltipIconAction
                title="More Labels"
                position="top"
                iconBtnSx={{
                  width: "auto",
                  height: "fit-content",
                  padding: "0",
                  margin: "0",
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#7c3aed",
                  },
                }}
                onClick={handleClick}
              >
                <More
                  sx={{
                    width: "20px",
                    height: "20px",
                    color: "#a8a29e",
                    "&:hover": {
                      color: "#7c3aed",
                    },
                  }}
                />
              </TolltipIconAction>
            )}
            <Popover
              id={id}
              open={open}
              anchorEl={labelEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              onClick={handleClose}
            >
              <div className="p-4 flex flex-col gap-2">
                {taskData?.labels?.slice(3).map((label, index) => {
                  return (
                    <Chip key={index} label={label} sx={{ fontSize: "12px" }} />
                  );
                })}
              </div>
            </Popover>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
