export default function reducer(state, action) {
  let tasks = null;

  switch(action.type) {
    case 'TASK-BEGIN':
      tasks = Object.assign({}, state.tasks);
      tasks[action.task] = true;

      return {
        runningTasks: state.runningTasks + 1,
        currentBatch: state.currentBatch + 1,
        tasks: tasks
      };

    case 'TASK-FINISH':
      if (state.tasks[action.task] !== true)
        return state;

      tasks = Object.assign({}, state.tasks);
      tasks[action.task] = false;

      if (state.runningTasks === 1)
        return {
          runningTasks: 0,
          currentBatch: 0,
          tasks: tasks
        };

      return {
        runningTasks: state.runningTasks - 1,
        currentBatch: state.currentBatch,
        tasks: tasks
      };

    default:
      if (!state)
        return {
          runningTasks: 0,
          currentBatch: 0,
          tasks: {}
        };

      return state;
  }
}

export function beginTask(task) {
  return {
    type: 'TASK-BEGIN',
    task: task
  };
}

export function finishTask(task) {
  return {
    type: 'TASK-FINISH',
    task: task
  };
}
