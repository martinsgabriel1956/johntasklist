import { FormEvent, useContext, useState } from "react";
import { X } from 'phosphor-react';
import clsx from 'clsx';
import { DraggableTaskList, Separator, ThemeSwitchButton } from "../../components";
import { TasksContext } from "../../context/TasksContext";
import { ThemeContext } from "../../context/ThemeContext";

export function Home() {
  const [task, setTask] = useState("");
  const { addNewTask, allTasks } = useContext(TasksContext);
  const { theme } = useContext(ThemeContext);

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
    <main
      className={clsx("flex flex-col items-center justify-center h-screen relative bg-bg  px-16 w-screen ", {
        "bg-dark-bg": theme === "dark",
        "bg-light-bg": theme === "light",
      })}
    >
      <form onSubmit={handleAddNewTodo} className="w-full">
        <div className="flex justify-between ">
          <h1
            className={clsx("font-bold leading-normal text-[3.5rem]", {
              "text-dark-title": theme === "dark",
              "text-light-title": theme === "light",
            })}
          >
            John Task List
          </h1>
          <div
            className={clsx("p-4 rounded-md border border-solid w-14 h-14 mt-5", {
              "bg-buttonBgDark": theme === "dark",
              "border-dark-border": theme === "dark",
              "bg-buttonBgLight": theme === "light",
              "border-light-border": theme === "light",
            })}
          >
            🚀
          </div>
        </div>
        <div className="mb-6">
          <div className="mt-8 pb-8 flex items-center gap-4">
            <div className="relative w-full">
              <input
                type="text"
                className={clsx("w-full mx-auto h-12 rounded-lg px-4", {
                  "bg-dark-purple/30": theme === "dark",
                  "bg-dark-text/30": theme === "light",
                  "text-white": theme === "dark",
                  "text-light-text": theme === "light",
                })}
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
                className={clsx("disabled:cursor-not-allowed border-2 border-solid  p-2.5 rounded-lg   transition-all disabled:opacity-[0.75]", {
                  "border-dark-purple/40": theme === "dark",
                  "border-dark-text/90": theme === "light",
                  "text-dark-text": theme === "dark",
                  "text-light-text": theme === "light",
                  "lg:hover:bg-dark-purple/30": task.trim() !== ""
                })}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div>
          <span
            className={clsx("text-base font-bold ", {
              "text-dark-purple": theme === "dark",
              "text-light-text": theme === "light"
            })}
          >
            Notes:
          </span>
          <Separator
            className={clsx("my-8", {
              "bg-dark-border": theme === "dark",
              "bg-light-border": theme === "light"
            })}
          />
          <DraggableTaskList />
        </div>
      </form>
      <ThemeSwitchButton />
    </main>
  )
}