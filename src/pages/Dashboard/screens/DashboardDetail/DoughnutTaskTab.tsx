import { FC, useState } from "react";
import { DoughnutProvider } from "../../../../components";
import { useTask } from "../../../../context";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DoughnutTaskTab = () => {
  const [selectedCategory, setSelectedCategory] = useState("Priority");
  const { state } = useTask();

  let labels = [];
  let values = [];

  if (selectedCategory === "Priority") {
    const priorityLabels = ["Low", "Medium", "High"];

    const priorityValues = priorityLabels.map((priority) => {
      return [
        ...state.toDoList,
        ...state.inProgressList,
        ...state.doneList,
      ].reduce((priorityCount, item) => {
        return item.priority === priority ? priorityCount + 1 : priorityCount;
      }, 0);
    });
    labels = priorityLabels;
    values = priorityValues;
  }

  if (selectedCategory === "Variant") {
    const variantLabels = ["To Do", "In Progress", "Done"];
    const variantValues = [
      state.toDoList.length,
      state.inProgressList.length,
      state.doneList.length,
    ];
    labels = variantLabels;
    values = variantValues;
  }
  return (
    <div>
      <FormControl>
        <InputLabel id="doughnut_type_select_label">Category</InputLabel>
        <Select
          labelId="doughnut_type_select_label"
          id="doughnut_type_select"
          value={selectedCategory}
          label="Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {["Priority", "Variant"].map((item, index) => {
            return (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <DoughnutProvider
        doughnutLabel={labels}
        doughnutData={values}
        doughnutTitle={selectedCategory}
      />
    </div>
  );
};

export default DoughnutTaskTab;
