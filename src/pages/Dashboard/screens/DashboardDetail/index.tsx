import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TolltipIconAction,
  ModalProvider,
  LightLoader,
  DarkLoader,
  EmptyListCard,
} from "../../../../components";
import { PageContainer } from "../../../../layout";
import { TaskCard, TaskColumn } from "../../components";
import {
  Add,
  ArrowBack,
  Dashboard,
  DonutSmall,
  Leaderboard,
  PieChart,
} from "@mui/icons-material";
import TaskForm from "../../../../components/TaskForm";
import { useMode, useProject, useTask } from "../../../../context";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Task } from "../../../../types";
import DoughnutTaskTab from "./DoughnutTaskTab";
import BarTab from "./BarTab";

interface DashboardDetailProps {}

const DashboardDetail: FC<DashboardDetailProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [activeChart, setActiveChart] = useState("Pie");
  const {
    state,
    getProjectDataHandler,
    dispatch: taskDispatch,
    isLoading,
  } = useTask();
  const { dispatch } = useProject();

  const { projectId } = useParams();
  const { isDarkTheme } = useMode();

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  const openAddTaskModal = () => setIsAddTaskModalOpen(true);
  const closeAddTaskModal = () => setIsAddTaskModalOpen(false);

  const headerNavList = [
    { title: "Dashboard", reach: 0, icon: <Dashboard /> },
    { title: "Charts", reach: 1, icon: <DonutSmall /> },
  ];

  const onDragEnd = (result: DropResult) => {
    let { draggableId, destination, source } = result;
    if (!destination) {
      if (state.doneList.length === 0) {
        destination = {
          droppableId: "doneList",
          index: 0,
        };
      } else if (state.inProgressList.length === 0) {
        destination = {
          droppableId: "inProgressList",
          index: 0,
        };
      } else if (state.toDoList.length === 0) {
        destination = {
          droppableId: "toDoList",
          index: 0,
        };
      } else {
        return;
      }
    }
    let {
      droppableId: destinationDroppableId,
      index: destinationIndex,
    }: { droppableId: string; index: number } = destination;

    const {
      droppableId: sourceDroppableId,
      index: sourceIndex,
    }: { droppableId: string; index: number } = source;
    if (!destination) return;
    if (
      sourceDroppableId === destinationDroppableId &&
      sourceIndex === destinationIndex
    )
      return;

    // @ts-ignore
    let staticList: Task[] = [...state[sourceDroppableId]];
    // @ts-ignore
    let decrementedList = [...state[sourceDroppableId]];
    // @ts-ignore
    let incrementedList = [...state[destinationDroppableId]];

    if (incrementedList.length === 0) {
      incrementedList.push();
    }
    if (
      sourceDroppableId === destinationDroppableId &&
      sourceIndex !== destinationIndex
    ) {
      const foundTask: Task | undefined = staticList.find((task) => {
        return task._id === draggableId;
      });
      let leftSlice;
      let rightSlice;
      if (sourceIndex > destinationIndex) {
        if (destinationIndex === 0) {
          staticList = staticList.filter((task) => task._id !== foundTask?._id);
          // @ts-ignore
          staticList.unshift(foundTask);
        } else {
          rightSlice = staticList.slice(sourceIndex + 1, staticList.length);
          leftSlice = [
            ...staticList.slice(0, destinationIndex),
            foundTask,
            ...staticList.slice(destinationIndex, sourceIndex),
          ];
          // @ts-ignore
          staticList = [...leftSlice, ...rightSlice];
        }
      }
      if (sourceIndex < destinationIndex) {
        if (destinationIndex === staticList.length - 1) {
          staticList = staticList.filter((task) => task._id !== foundTask?._id);
          // @ts-ignore
          staticList.push(foundTask);
        } else {
          rightSlice = [
            ...staticList.slice(sourceIndex + 1, destinationIndex + 1),
            foundTask,
            ...staticList.slice(destinationIndex + 1, staticList.length),
          ];
          leftSlice = staticList.slice(0, sourceIndex);
          // @ts-ignore
          staticList = [...leftSlice, ...rightSlice];
        }
      }
      taskDispatch({
        type: "SET_LIST_DATA",
        payload: {
          ...state,
          [sourceDroppableId]: staticList,
        },
      });
    }
    if (sourceDroppableId !== destinationDroppableId) {
      const foundTask = decrementedList.find((task) => {
        return task._id === draggableId;
      });

      decrementedList = decrementedList.filter(
        (task) => task._id !== draggableId
      );

      if (destinationIndex === 0) {
        incrementedList.unshift(foundTask);
      }

      if (destinationIndex === incrementedList.length) {
        destinationIndex++;
        incrementedList.push(foundTask);
      }

      if (0 < destinationIndex && destinationIndex < incrementedList.length) {
        let leftSlice = incrementedList.slice(0, destinationIndex);
        let rightSlice = incrementedList.slice(
          destinationIndex,
          incrementedList.length + 1
        );

        incrementedList = [...leftSlice, foundTask, ...rightSlice];
      }

      taskDispatch({
        type: "SET_LIST_DATA",
        payload: {
          ...state,
          [sourceDroppableId]: decrementedList,
          [destinationDroppableId]: incrementedList,
        },
      });
    }
  };

  useEffect(() => {
    if (projectId) {
      dispatch({ type: "SET_PROJECT", payload: projectId });
      getProjectDataHandler(projectId);
    }
  }, [projectId]);

  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <TolltipIconAction
            position="top"
            title="Back"
            onClick={() => navigate(-1)}
          >
            <ArrowBack />
          </TolltipIconAction>
          <div className="">
            <ModalProvider
              isOpen={isAddTaskModalOpen}
              title="Add Task"
              OpenAction={
                <TolltipIconAction
                  title="Add Task"
                  position="top"
                  onClick={openAddTaskModal}
                >
                  <Add />
                </TolltipIconAction>
              }
              closeModal={closeAddTaskModal}
            >
              <TaskForm closeAction={closeAddTaskModal} projectId={projectId} />
            </ModalProvider>
          </div>
          <div className="flex gap-3">
            {headerNavList.map((item) => {
              return (
                <TolltipIconAction
                  key={item.reach}
                  position={
                    item.reach === 0
                      ? "top"
                      : item.reach === headerNavList.length - 1
                      ? "right"
                      : "top"
                  }
                  isActive={activeTab === item.reach}
                  onClick={() => setActiveTab(item.reach)}
                  title={item.title}
                >
                  {item.icon}
                </TolltipIconAction>
              );
            })}
          </div>
        </div>
        {activeTab === 0 && (
          <div className="flex gap-2 relative">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex w-full gap-4 flex-col lg:flex-row">
                <TaskColumn columnType="To Do">
                  <Droppable droppableId="toDoList">
                    {(provided, snapshot) => (
                      <div
                        className={`flex flex-col gap-4 ${
                          snapshot.isDraggingOver ? "dragActive" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {state?.toDoList.length === 0 && (
                          <EmptyListCard>No Items</EmptyListCard>
                        )}
                        {isLoading &&
                          (isDarkTheme ? <DarkLoader /> : <LightLoader />)}
                        {state?.toDoList.map((task, index) => {
                          return (
                            <TaskCard
                              taskData={task}
                              key={task._id}
                              index={index}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </TaskColumn>
                <TaskColumn columnType="In Progress">
                  <Droppable droppableId="inProgressList">
                    {(provided, snapshot) => (
                      <div
                        className={`flex flex-col gap-4 ${
                          snapshot.isDraggingOver ? "dragActive" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {state?.inProgressList.length === 0 && (
                          <EmptyListCard>No Items</EmptyListCard>
                        )}
                        {isLoading &&
                          (isDarkTheme ? <DarkLoader /> : <LightLoader />)}
                        {state?.inProgressList.map((task, index) => {
                          return (
                            <TaskCard
                              taskData={task}
                              key={task._id}
                              index={index}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </TaskColumn>
                <TaskColumn columnType="Done">
                  <Droppable droppableId="doneList">
                    {(provided, snapshot) => (
                      <div
                        className={`flex flex-col gap-4 ${
                          snapshot.isDraggingOver ? "dragActive" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {state?.doneList.length === 0 && (
                          <EmptyListCard>No Items</EmptyListCard>
                        )}
                        {isLoading &&
                          (isDarkTheme ? <DarkLoader /> : <LightLoader />)}
                        {state?.doneList.map((task, index) => {
                          return (
                            <TaskCard
                              taskData={task}
                              key={task._id}
                              index={index}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </TaskColumn>
              </div>
            </DragDropContext>
          </div>
        )}

        {activeTab === 1 && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-center">
              <div className="flex bg-[#ddd] rounded-md overflow-hidden">
                <TolltipIconAction
                  title="Pie Chart"
                  position="left"
                  iconBtnSx={{
                    borderRadius: "0",
                    "&:hover": {
                      backgroundColor:
                        activeChart === "Pie" ? "#7c3aed" : "#ccc",
                    },
                  }}
                  onClick={() => setActiveChart("Pie")}
                  isActive={activeChart === "Pie"}
                >
                  <PieChart />
                </TolltipIconAction>
                <TolltipIconAction
                  title="Bar Chart"
                  position="right"
                  iconBtnSx={{
                    borderRadius: "0",
                    "&:hover": {
                      backgroundColor:
                        activeChart === "Bar" ? "#7c3aed" : "#ccc",
                    },
                  }}
                  onClick={() => setActiveChart("Bar")}
                  isActive={activeChart === "Bar"}
                >
                  <Leaderboard />
                </TolltipIconAction>
              </div>
            </div>
            {activeChart === "Pie" &&
              state.toDoList.length > 0 &&
              state.inProgressList.length > 0 &&
              state.doneList.length > 0 && <DoughnutTaskTab />}
            {!(state.toDoList.length > 0) &&
              !(state.inProgressList.length > 0) &&
              !(state.doneList.length > 0) && (
                <EmptyListCard>
                  No Data for {activeChart === "Pie" ? "Pie" : "Bar"} Chart
                </EmptyListCard>
              )}
            <div>
              {activeChart === "Bar" &&
                state.toDoList.length > 0 &&
                state.inProgressList.length > 0 &&
                state.doneList.length > 0 && <BarTab />}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default DashboardDetail;
