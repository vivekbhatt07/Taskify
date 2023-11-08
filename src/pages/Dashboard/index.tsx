import { FC } from "react";
import {
  IconButton,
  TextButton,
  TolltipIconAction,
  TableProvider,
} from "../../components";
import { PageContainer } from "../../layout";
import { TaskCard, TaskColumn } from "./components";
import { ArrowDropDownCircle } from "@mui/icons-material";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const dashboardGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  };

  // const projectsList = [
  //   { id: "1", name: "Project 1" },
  //   { id: "2", name: "Project 2" },
  // ];

  return (
    <PageContainer>
      <div className="flex gap-2" style={dashboardGridStyle}>
        <TaskColumn columnType="To Do" columnColor="#0891b2">
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Low"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Medium"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="High"
            labels={["easy", "style"]}
          />
        </TaskColumn>
        <TaskColumn columnType="In Progress" columnColor="#f59e0b">
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Low"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Medium"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="High"
            labels={["easy", "style"]}
          />
        </TaskColumn>
        <TaskColumn columnType="Done" columnColor="#16a34a">
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Low"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="Medium"
            labels={["easy", "style"]}
          />
          <TaskCard
            title="UI/UX"
            description="Replicate UI of Dashboard"
            dueDate="12 September"
            priority="High"
            labels={["easy", "style"]}
          />
        </TaskColumn>
        {/* <TableProvider tableData={projectsList} originalData={projectsList} /> */}
      </div>
    </PageContainer>
  );
};

export default Dashboard;
