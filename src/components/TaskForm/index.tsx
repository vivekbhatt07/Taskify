import { FC, ReactNode, useState, ChangeEvent } from "react";
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
import { useProject, useTask } from "../../context";
import { Task } from "../../types";
import { useParams } from "react-router-dom";

interface TaskFormProps {
  children: ReactNode;
  closeAction: () => void;
  isEdit: Boolean;
  taskData: Task;
}

const TaskForm: FC<TaskFormProps> = ({
  children,
  closeAction,
  isEdit,
  taskData,
  id,
}): ReactNode => {
  const {
    addToDoTaskHandler,
    addInProgressTaskHandler,
    addDoneTaskHandler,
    updateToDoTaskHandler,
    updateInProgressTaskHandler,
    updateDoneTaskHandler,
  } = useTask();

  const { state } = useProject();

  console.log(state);
  const [taskFormData, setTaskFormData] = useState({
    title: isEdit ? taskData.title : "",
    description: isEdit ? taskData.description : "",
    dueDate: isEdit ? taskData.dueDate : "",
    priority: isEdit ? taskData.priority : "Low",
    variant: isEdit ? taskData.variant : "ToDo",
    labels: isEdit ? taskData.labels : [],
  });

  const handleTaskFormDataInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  const handleTaskFormDataSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      if (taskFormData.variant === "ToDo") {
        updateToDoTaskHandler(taskFormData._id, taskFormData);
      } else if (taskFormData.variant === "InProgress") {
        updateInProgressTaskHandler(taskFormData._id, taskFormData);
      } else if (taskFormData.variant === "Done") {
        updateDoneTaskHandler(taskFormData._id, taskFormData);
      }
    } else {
      if (taskFormData.variant === "ToDo") {
        addToDoTaskHandler(taskFormData, state.currentProject[0]._id);
      } else if (taskFormData.variant === "InProgress") {
        addInProgressTaskHandler(taskFormData, state.currentProject[0]._id);
      } else if (taskFormData.variant === "Done") {
        addDoneTaskHandler(taskFormData, state.currentProject[0]._id);
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
            onChange={handleTaskFormDataInput}
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
            onChange={handleTaskFormDataInput}
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
