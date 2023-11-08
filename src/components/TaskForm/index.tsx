import { FC, ReactNode, useState } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

import AutoCompleteWithChips from "../AutoCompleteWithChips";
import { TextButton } from "../../components";

interface TaskFormProps {
  children: ReactNode;
}

const TaskForm: FC<TaskFormProps> = ({ children }): ReactNode => {
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    variant: "ToDo",
    labels: [],
  });

  const handleTaskFormDataInput = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prevTaskFormData) => {
      return { ...prevTaskFormData, [name]: value };
    });
  };

  function handleTagsChange(event) {
    const { name, value } = event;
    setTaskFormData((prevTaskFormData) => ({
      ...prevTaskFormData,
      [name]: value,
    }));
  }

  return (
    <div>
      <form className="flex flex-col gap-4">
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
          <TextButton>Update</TextButton>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
