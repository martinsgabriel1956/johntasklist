import { FormEvent, useContext, useState } from "react";
import { X } from 'phosphor-react';
import { Task } from "../../components/Task";
import { TasksContext } from "../../context/TasksContext";

export function Home() {
  const [task, setTask] = useState("");

  const { addNewTask, allTasks } = useContext(TasksContext);

  function handleAddNewTodo(event: FormEvent) {
    event.preventDefault();
    const isToDoInputEmpty = task.trim() === "";

    if (isToDoInputEmpty) {
      return;
    }

    addNewTask(task);
    setTask("");
  }

  function handleCleanTodo() {
    setTask("");
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-borderDark text-white px-16 ">
      <form onSubmit={handleAddNewTodo} className="w-full">
        <div className="flex gap-4 pb-8 border-b border-b-borderDark ">
          <div>
            <h1 className="font-bold leading-normal text-[3.5rem] mb-4">John Task List</h1>
            <span className="text-base font-bold text-darkPurple">Notes:</span>
          </div>
          <div className="p-4 bg-buttonBg rounded-md border border-solid border-borderDark w-14 h-14 mt-5">
            <button
              disabled={task.trim() === ""}
              type="submit"
              className="disabled:cursor-not-allowed"
            >
              🚀
            </button>
          </div>
        </div>
        <div>
          <div className="my-8 w-full relative border-b border-solid border-borderDark pb-8">
            <input
              type="text"
              className="w-full mx-auto h-12 rounded-lg bg-slate-600 px-4"
              placeholder="Add new ToDo"
              value={task}
              onChange={event => setTask(event.target.value)}
            />
            {task && (
              <button
                type="button"
                className="absolute top-3.5 right-4"
                onClick={handleCleanTodo}
                title="Add new ToDo input"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            )}
          </div>

        </div>
        <ul>
          {allTasks.map(todo => (
            <Task
              key={todo.id}
              id={todo.id}
              title={todo.title}
            />
          ))}
        </ul>
      </form>
    </main>
  )
}