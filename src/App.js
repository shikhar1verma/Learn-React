import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  const transformTasks = useCallback((tasksObj) => {
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    fetchTasks(
      {
        url: "https://react-custom-hooks-abf71-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      },
      transformTasks
    );
  }, [fetchTasks, transformTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks.bind(
          null,
          {
            url: "https://react-custom-hooks-abf71-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
          },
          transformTasks
        )}
      />
    </React.Fragment>
  );
}

export default App;
