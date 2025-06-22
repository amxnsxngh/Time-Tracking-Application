# ⏱️ Time Tracking App

A clean and lightweight React app for tracking tasks and time efficiently.

---

## Features

- Add new tasks or input completed tasks manually  
- Start and stop timers on tasks  
- Real-time tracking of hours and minutes  
- Summary view for:  
  - Tasks Completed  
  - Tasks In Progress  
  - Total Time Worked  
- Edit task name, time, and status  
- Delete any task  
- Live updates without page reload  

---


## Getting Started

### Prerequisites

- Node.js (v16+ recommended)  
- npm or yarn  

---

### Setup Instructions

## bash
# 1. Clone the repository
```
git clone https://github.com/amxnsxngh/Time-Tracking-Application.git
```

# 2. Navigate into the project directory
```
cd Time-Tracking-Application
```

# 3. Install dependencies
```
npm install
```

# 4. Run the development server
```
npm run dev
```
 Visit: http://localhost:5173


### How It Works

- Tasks are stored in state using React hooks.
- Timers are handled with `useRef` and `setInterval` per task.
- `TaskList` dynamically updates as timers run.
- `Summary` calculates total time and task statuses.
- Tailwind CSS is used for clean, responsive design.

---

### UI Overview

| Section   | Description                       |
| --------- | -------------------------------- |
| TaskForm  | Input form for adding new or old tasks |
| TaskList  | Displays all tasks with actions  |
| Summary   | Cards showing key stats in real-time |

---
## Any Assumptions or Trade-offs

- **Assumptions:**
  - Tasks are uniquely identified by an incrementing numeric ID.
  - Time is tracked in hours and minutes only; seconds are not shown in the UI for simplicity.
  - Old tasks are assumed to be completed and require manual input of time taken.
  - Timer intervals update every second but only display time in minutes to keep UI clean.
  
- **Trade-offs:**
  - Task data is stored in React state only; no persistence (like localStorage or backend) is implemented to keep the scope focused.
  - The timer uses `setInterval` which may not be perfectly accurate over long periods but is sufficient for this use case.
  - UI design uses Tailwind CSS for rapid development and responsiveness but lacks advanced styling or animations.
  - Editing task time and status is possible only via the TaskList inline editor — no separate dedicated edit page.

---

## Future Enhancements

- Persist tasks in localStorage or backend
- CSV export of task logs
- Categorization or tagging system
