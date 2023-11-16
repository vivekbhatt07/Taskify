import { FC, ReactNode } from "react";
import { useMode } from "../../../../context";

interface TaskColumnProps {
  columnType: String;
  children: ReactNode;
}

const TaskColumn: FC<TaskColumnProps> = ({ columnType, children }) => {
  const { isDarkTheme } = useMode();
  return (
    <div className="bg-[#ddd] dark:bg-800 min-h-[300px] rounded-lg overflow-hidden basis-1/3">
      {/* HEAD */}
      <div
        className={`p-4 uppercase text-center bg-[#292524] dark:bg-700 text-[#fff]`}
      >
        {columnType}
      </div>
      {/* BODY */}
      <div
        className={`p-4 flex flex-col gap-4 max-h-[580px] overflow-y-scroll ${
          isDarkTheme ? "task_column_body_dark" : "task_column_body_light"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default TaskColumn;
