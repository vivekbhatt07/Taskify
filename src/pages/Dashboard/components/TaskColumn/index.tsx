import { FC, ReactNode } from "react";

interface TaskColumnProps {
  columnType: String;
  columnColor: String;
  children: ReactNode;
}

const TaskColumn: FC<TaskColumnProps> = ({
  columnType,
  columnColor,
  children,
}) => {
  return (
    <div className="bg-400 dark:bg-800 min-h-[300px] rounded-lg overflow-hidden basis-1/3">
      {/* HEAD */}
      <div
        className={`p-4 uppercase text-center`}
        // style={{ backgroundColor: columnColor }}
      >
        {columnType}
      </div>
      {/* BODY */}
      <div className="p-4 flex flex-col gap-4 max-h-[500px] overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default TaskColumn;
