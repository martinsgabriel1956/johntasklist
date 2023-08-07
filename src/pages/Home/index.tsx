import { FormEvent, useContext, useState } from "react";
import { X } from 'phosphor-react';
import { DraggableTaskList, Separator } from "../../components";
import { TasksContext } from "../../context/TasksContext";

export function Home() {
  const [task, setTask] = useState("");
  const { addNewTask } = useContext(TasksContext);

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
    <main className="flex flex-col items-center justify-center h-screen bg-bg text-white px-16 w-screen ">
      <form onSubmit={handleAddNewTodo} className="w-full">
        <div className="flex justify-between ">
          <h1 className="font-bold leading-normal text-[3.5rem]">John Task List</h1>
          <button
            className="p-4 bg-buttonBg rounded-md border border-solid border-borderDark w-14 h-14 mt-5"
          >
            🚀
          </button>
        </div>
        <div className="mb-6">
          <div className="mt-8 pb-8 flex items-center gap-4">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full mx-auto h-12 rounded-lg bg-darkPurple/30 px-4"
                placeholder="Add new task"
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
            <div>
              <button
                disabled={task.trim() === ""}
                type="submit"
                className="disabled:cursor-not-allowed border-2 border-solid border-darkPurple/40 p-2.5 rounded-lg text-textDark lg:hover:bg-darkPurple/30 transition-all "
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div>
          <span className="text-base font-bold text-darkPurple">Notes:</span>
          <Separator
            className="my-8"
          />
          <DraggableTaskList />
        </div>
      </form>
    </main>
  )
}