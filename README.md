# Taskify

[Taskify](https://taskify-theta-two.vercel.app/) - Task Managment App

## How to install and run locally?

```
$ git clone https://github.com/vivekbhatt07/Taskify
$ cd Taskify
$ npm install
$ npm run dev
```

## Features -

1. **Task Board Layout:** A task board layout with four columns representing the stages: Ready, In Progress, Testing, and Done.
2. **Project Section:** User can add projects, individual project includes title and description. On opening a project, it open a Detail page which includes all the tasks.
3. **Drag-and-Drop:** The ability to drag and drop tasks from one group to another. Tasks are visually draggable and snap into the appropriate stage when dropped.
4. **Task Cards:** A task card within its respective group. The task card displays the task's name, priority, and any other relevant information.
5. **Task Metrics:** Visual metrics for each group, showing the total number of tasks in that stage, along with the breakdown of tasks based on their priorities (Urgent, High, Medium, Low).

6. Unique badges to each task based on severity (High/Medium/Low)
7. Light mode and dark mode

## Technology Used -

### Frontend:

- React JS
- React Context API
- React Router v6
- Tailwind CSS
- react-beautiful-dnd
- react-chartjs-2
- MUI Icons
- MUI Components
- Axios
- Typescript
- Lottie Animations(Loader)

### Backend:

- Mongo DB
- Express JS
