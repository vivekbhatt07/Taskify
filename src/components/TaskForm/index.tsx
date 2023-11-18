import { FC, ReactNode, useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import AutoCompleteWithChips from "../AutoCompleteWithChips";
import { TextButton } from "../../components";
import { useTask } from "../../context";
import { Task } from "../../types";

interface TaskFormProps {
  children?: ReactNode;
  closeAction: () => void;
  isEdit?: boolean;
  taskData?: Task;
  projectId?: string | undefined;
}

const TaskForm: FC<TaskFormProps> = ({
  closeAction,
  isEdit,
  taskData,
  projectId,
}): ReactNode => {
  const {
    addToDoTaskHandler,
    addInProgressTaskHandler,
    addDoneTaskHandler,
    updateToDoTaskHandler,
    updateInProgressTaskHandler,
    updateDoneTaskHandler,
  } = useTask();

  const [taskFormData, setTaskFormData] = useState({
    title: isEdit ? taskData?.title ?? "" : "",
    description: isEdit ? taskData?.description ?? "" : "",
    dueDate: isEdit ? taskData?.dueDate ?? "" : "",
    priority: isEdit ? taskData?.priority ?? "Low" : "Low",
    variant: isEdit ? taskData?.variant ?? "ToDo" : "ToDo",
    labels: isEdit ? taskData?.labels ?? [] : [],
  });

  const handleTaskFormDataInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTaskFormData((prevTaskFormData) => {
      return { ...prevTaskFormData, [name]: value };
    });
  };

  const handleSelectTaskFormDataInput = (
    event: SelectChangeEvent<
      "Low" | "Medium" | "High" | "ToDo" | "InProgress" | "Done"
    >
  ) => {
    const { name, value } = event.target;
    setTaskFormData((prevTaskFormData) => {
      return { ...prevTaskFormData, [name]: value };
    });
  };

  function handleTagsChange(event: { name: string; value: string[] }) {
    const { name, value } = event;
    setTaskFormData((prevTaskFormData) => ({
      ...prevTaskFormData,
      [name]: value,
    }));
  }

  const handleTaskFormDataSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit) {
      // if (!taskData._id) return;
      if (taskFormData.variant === "ToDo") {
        updateToDoTaskHandler({
          taskId: taskData?._id ?? "",
          updatedFields: taskFormData,
        });
      } else if (taskFormData.variant === "InProgress") {
        updateInProgressTaskHandler({
          taskId: taskData?._id ?? "",
          updatedFields: taskFormData,
        });
      } else if (taskFormData.variant === "Done") {
        updateDoneTaskHandler({
          taskId: taskData?._id ?? "",
          updatedFields: taskFormData,
        });
      }
    } else {
      if (!projectId) return;
      if (taskFormData.variant === "ToDo") {
        addToDoTaskHandler({
          task: taskFormData,
          projectId: projectId,
        });
      } else if (taskFormData.variant === "InProgress") {
        addInProgressTaskHandler({
          task: taskFormData,
          projectId: projectId,
        });
      } else if (taskFormData.variant === "Done") {
        addDoneTaskHandler({
          task: taskFormData,
          projectId: projectId,
        });
      }
    }
    closeAction();
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleTaskFormDataSubmit}>
        {/* NAME */}
        <TextField
          variant="outlined"
          label="Title"
          name="title"
          value={taskFormData.title}
          onChange={handleTaskFormDataInput}
        />
        {/* DESCRIPTION */}
        <TextField
          variant="outlined"
          label="Description"
          name="description"
          value={taskFormData.description}
          onChange={handleTaskFormDataInput}
        />
        {/* DATE */}
        <TextField
          variant="outlined"
          type="date"
          name="dueDate"
          value={taskFormData.dueDate}
          onChange={handleTaskFormDataInput}
        />
        {/* PRIORITY */}
        <FormControl fullWidth>
          <InputLabel id="task_card_select_priority_label">Priority</InputLabel>
          <Select
            labelId="task_card_select_priority_label"
            id="task_card_select_priority"
            name="priority"
            value={taskFormData.priority}
            onChange={handleSelectTaskFormDataInput}
            label="Priority"
          >
            {["Low", "Medium", "High"].map((priority, index) => (
              <MenuItem value={priority} key={index}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* VARIANT */}
        <FormControl fullWidth>
          <InputLabel id="task_card_select_variant_label">Variant</InputLabel>
          <Select
            labelId="task_card_select_variant_label"
            id="task_card_select_variant"
            name="variant"
            value={taskFormData.variant}
            onChange={handleSelectTaskFormDataInput}
            label="Variant"
          >
            {["ToDo", "InProgress", "Done"].map((variant, index) => (
              <MenuItem value={variant} key={index}>
                {variant}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <AutoCompleteWithChips
          label="Label"
          values={taskFormData.labels}
          placeholder="Type & Press Enter"
          onTagUpdate={(tags) => {
            handleTagsChange({ name: "labels", value: tags });
          }}
        />
        <div>
          <TextButton type="submit">{isEdit ? "Update" : "Add"}</TextButton>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
