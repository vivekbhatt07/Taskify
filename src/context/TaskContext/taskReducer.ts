import { TaskAction, TaskState } from "./taskContextTypes";

export const initialTaskState = {
  toDoList: [],
  inProgressList: [],
  doneList: [],
};

export const taskReducer = (
  state: TaskState,
  { type, payload }: TaskAction
) => {
  switch (type) {
    case "SET_LIST_DATA": {
      return {
        ...state,
        toDoList: payload.toDoList,
        inProgressList: payload.inProgressList,
        doneList: payload.doneList,
      };
    }

    case "ADD_TODO_TASK": {
      return {
        ...state,
        toDoList: [...state.toDoList, payload],
      };
    }

    case "ADD_INPROGRESS_TASK": {
      return {
        ...state,
        inProgressList: [...state.inProgressList, payload],
      };
    }

    case "ADD_DONE_TASK": {
      return {
        ...state,
        doneList: [...state.doneList, payload],
      };
    }

    case "DELETE_TODO_TASK": {
      return {
        ...state,
        toDoList: state.toDoList.filter((toDo) => toDo._id !== payload),
      };
    }

    case "DELETE_INPROGRESS_TASK": {
      return {
        ...state,
        inProgressList: state.inProgressList.filter(
          (inProgress) => inProgress._id !== payload
        ),
      };
    }

    case "DELETE_DONE_TASK": {
      return {
        ...state,
        doneList: state.doneList.filter((done) => done._id !== payload),
      };
    }

    case "UPDATE_TODO_TASK": {
      return {
        ...state,
        toDoList: state.toDoList.map((toDo) =>
          toDo._id === payload._id ? payload : toDo
        ),
      };
    }

    case "UPDATE_INPROGRESS_TASK": {
      return {
        ...state,
        inProgressList: state.inProgressList.map((inProgress) =>
          inProgress._id === payload._id ? payload : inProgress
        ),
      };
    }

    case "UPDATE_DONE_TASK": {
      return {
        ...state,
        doneList: state.doneList.map((done) =>
          done._id === payload._id ? payload : done
        ),
      };
    }
  }
};
