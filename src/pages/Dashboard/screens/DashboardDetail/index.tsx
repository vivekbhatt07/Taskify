import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  IconButton,
  TolltipIconAction,
  ModalProvider,
} from "../../../../components";
import { PageContainer } from "../../../../layout";
import { TaskCard, TaskColumn } from "../../components";
import { Add } from "@mui/icons-material";
import TaskForm from "../../../../components/TaskForm";
import { useProject, useTask } from "../../../../context";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

interface DashboardDetailProps {}

const DashboardDetail: FC<DashboardDetailProps> = () => {
  const { state, getProjectDataHandler } = useTask();
  const { dispatch } = useProject();
  const { dispatch: taskDispatch } = useTask();
  const { projectId } = useParams();

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  const openAddTaskModal = () => setIsAddTaskModalOpen(true);
  const closeAddTaskModal = () => setIsAddTaskModalOpen(false);

  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination, source } = result;
    const { droppableId: destinationDroppableId, index: destinationIndex } =
      destination; // "InProgress", 1
    const { droppableId: sourceDroppableId, index: sourceIndex } = source; // "Done", 0

    if (!destination) return;
    if (
      sourceDroppableId === destinationDroppableId &&
      sourceIndex === destinationIndex
    )
      return;

    let staticList = [...state[sourceDroppableId]];
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
          staticList = [
            foundTask,
            ...staticList.slice(0, sourceIndex),
            ...staticList.slice(sourceIndex + 1, staticList.length),
          ];
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
          staticList = [
            ...staticList.slice(0, sourceIndex),
            ...staticList.slice(sourceIndex + 1, destinationIndex),
            foundTask,
          ];
        } else {
          rightSlice = [
            ...staticList.slice(sourceIndex, destinationIndex),
            foundTask,
            ...staticList.slice(destinationIndex, staticList.length),
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
      <div className="flex gap-2 relative">
        <div className="absolute">
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
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex w-full gap-4">
            <TaskColumn columnType="To Do" columnColor="#0891b2">
              <Droppable droppableId="toDoList">
                {(provided) => (
                  <div
                    className="flex flex-col gap-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {state?.toDoList.map((task, index) => {
                      return (
                        <TaskCard taskData={task} key={index} index={index} />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </TaskColumn>
            <TaskColumn columnType="In Progress" columnColor="#f59e0b">
              <Droppable droppableId="inProgressList">
                {(provided) => (
                  <div
                    className="flex flex-col gap-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {state?.inProgressList.map((task, index) => {
                      return (
                        <TaskCard taskData={task} key={index} index={index} />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </TaskColumn>
            <TaskColumn columnType="Done" columnColor="#16a34a">
              <Droppable droppableId="doneList">
                {(provided) => (
                  <div
                    className="flex flex-col gap-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {state?.doneList.map((task, index) => {
                      return (
                        <TaskCard taskData={task} key={index} index={index} />
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
    </PageContainer>
  );
};

export default DashboardDetail;
