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
    <div className="bg-800 min-h-[300px] rounded-lg overflow-hidden">
      {/* HEAD */}
      <div
        className={`p-4 uppercase text-center`}
        // style={{ backgroundColor: columnColor }}
      >
        {columnType}
      </div>
      {/* BODY */}
      <div className="p-4 flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default TaskColumn;
