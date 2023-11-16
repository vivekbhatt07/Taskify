import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TolltipIconAction, ModalProvider } from "../../../../components";
import { PageContainer } from "../../../../layout";
import { TaskCard, TaskColumn } from "../../components";
import {
  Add,
  ArrowBack,
  Dashboard,
  DonutSmall,
  TableChart,
} from "@mui/icons-material";
import TaskForm from "../../../../components/TaskForm";
import { useProject, useTask } from "../../../../context";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Task } from "../../../../types";

interface DashboardDetailProps {}

const DashboardDetail: FC<DashboardDetailProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const { state, getProjectDataHandler } = useTask();
  const { dispatch } = useProject();
  const { dispatch: taskDispatch } = useTask();
  const { projectId } = useParams();

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  const openAddTaskModal = () => setIsAddTaskModalOpen(true);
  const closeAddTaskModal = () => setIsAddTaskModalOpen(false);

  const headerNavList = [
    { title: "Dashboard", reach: 0, icon: <Dashboard /> },
    { title: "Charts", reach: 1, icon: <DonutSmall /> },
    { title: "Table", reach: 2, icon: <TableChart /> },
  ];

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { draggableId, destination, source } = result;
    let { droppableId: destinationDroppableId, index: destinationIndex } =
      destination; // "InProgress", 1
    const { droppableId: sourceDroppableId, index: sourceIndex } = source; // "Done", 0
    if (!destination) return;
    if (
      sourceDroppableId === destinationDroppableId &&
      sourceIndex === destinationIndex
    )
      return;

    let staticList: Task[] = [...state[sourceDroppableId]];
    let decrementedList = [...state[sourceDroppableId]];
    let incrementedList = [...state[destinationDroppableId]];
    if (
      sourceDroppableId === destinationDroppableId &&
      sourceIndex !== destinationIndex
    ) {
      const foundTask = staticList.find((task) => {
        return task._id === draggableId;
      });
      let leftSlice;
      let rightSlice;
      if (sourceIndex > destinationIndex) {
        if (destinationIndex === 0) {
          staticList = staticList.filter((task) => task._id !== foundTask?._id);
          staticList.unshift(foundTask);
        } else {
          rightSlice = staticList.slice(sourceIndex + 1, staticList.length);
          leftSlice = [
            ...staticList.slice(0, destinationIndex),
            foundTask,
            ...staticList.slice(destinationIndex, sourceIndex),
          ];
          staticList = [...leftSlice, ...rightSlice];
        }
      }
      if (sourceIndex < destinationIndex) {
        if (destinationIndex === staticList.length - 1) {
          staticList = staticList.filter((task) => task._id !== foundTask?._id);
          staticList.push(foundTask);
        } else {
          rightSlice = [
            ...staticList.slice(sourceIndex + 1, destinationIndex + 1),
            foundTask,
            ...staticList.slice(destinationIndex + 1, staticList.length),
          ];
          leftSlice = staticList.slice(0, sourceIndex);
          staticList = [...leftSlice, ...rightSlice];
        }
      }
      if (sourceDroppableId === "toDoList") {
        taskDispatch({
          type: "SET_LIST_DATA",
          payload: {
            toDoList: staticList,
            inProgressList: state.inProgressList,
            doneList: state.doneList,
          },
        });
      } else if (sourceDroppableId === "inProgressList") {
        taskDispatch({
          type: "SET_LIST_DATA",
          payload: {
            toDoList: state.toDoList,
            inProgressList: staticList,
            doneList: state.doneList,
          },
        });
      } else if (sourceDroppableId === "doneList") {
        taskDispatch({
          type: "SET_LIST_DATA",
          payload: {
            toDoList: state.toDoList,
            inProgressList: state.inProgressList,
            doneList: staticList,
          },
        });
      }
    }
    if (sourceDroppableId !== destinationDroppableId) {
      const foundTask = decrementedList.find((task) => {
        return task._id === draggableId;
      });

      decrementedList = decrementedList.filter(
        (task) => task._id !== draggableId
      );

      if (destinationIndex === 0) {
        console.log("first");
        incrementedList.unshift(foundTask);
      }

      if (destinationIndex === incrementedList.length) {
        destinationIndex++;
        incrementedList.push(foundTask);
      }

      if (0 < destinationIndex && destinationIndex < incrementedList.length) {
        console.log("between");
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
              <div className="flex w-full gap-4">
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
      </div>
    </PageContainer>
  );
};

export default DashboardDetail;
