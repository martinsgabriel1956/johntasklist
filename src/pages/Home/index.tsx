import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { X } from 'phosphor-react';
import clsx from 'clsx';
import { DraggableTaskList, Separator, ThemeSwitchButton } from "../../components";
import { TasksContext } from "../../context/TasksContext";
import { ThemeContext } from "../../context/ThemeContext";

export function Home() {
  const [task, setTask] = useState("");
  const [hasError, setHasError] = useState(false);
  const { addNewTask, allTasks } = useContext(TasksContext);
  const { theme } = useContext(ThemeContext);

  function handleAddNewTodo(event: FormEvent) {
    event.preventDefault();
    const isToDoInputEmpty = task.trim() === "";

    if (isToDoInputEmpty) {
      setHasError(true);
      return;
    }

    addNewTask(task);
    setTask("");
  }

  function handleChangeTaskField(event: ChangeEvent<HTMLInputElement>) {
    const isEmptyField = event.target.value.trim() === "";
    if (!isEmptyField) setHasError(false);
    setTask(event.target.value);
  }

  function handleCleanTodo() {
    setTask("");
  }

  return (
    <main
      className={clsx("flex flex-col items-center justify-center max-h-screen h-screen relative bg-bg  px-16 max-md:px-8 w-screen transition-all", {
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
                  "placeholder:text-dark-gradientFrom": theme === "light",
                })}
                placeholder="Add new task"
                value={task}
                onChange={handleChangeTaskField}
              />
              {task && (
                <button
                  type="button"
                  className="absolute top-[0.8594rem] right-3"
                  onClick={handleCleanTodo}
                  title="Add new ToDo input"
                >
                  <X className={clsx("w-6 h-6 ", {
                    "text-white": theme === "dark",
                    "text-light-text": theme === "light"
                  })} />
                </button>
              )}
              {hasError && (
                <small className="absolute text-base mt-2 block font-bold text-red-600/90">
                  Fill in the task field
                </small>
              )}
            </div>
            <div>
              <button
                type="submit"
                className={clsx("disabled:cursor-not-allowed border-2 border-solid  p-2.5 rounded-lg   transition-all", {
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
            className={clsx("my-8 ", {
              "bg-dark-border": theme === "dark",
              "bg-light-border": theme === "light",
              "invisible": allTasks.length === 0
            })}
          />
          {allTasks.length === 0 ? (
            <div
              className="min-w-[275px] max-w-[500px] flex flex-col items-center justify-center mx-auto"
            >
              <img
                src={`/src/assets/hero-${theme === "dark" ? "dark" : "light"}.svg`}
                alt=""
                className="w-full pb-4"
              />
              <span
                className={clsx("text-2xl ", {
                  "text-dark-purple": theme === "dark",
                  "text-light-text": theme === "light"
                })}
              >
                Add a new task to see it here
              </span>
            </div>
          ) : <DraggableTaskList />}

        </div>
      </form>
      <ThemeSwitchButton />
    </main>
  )
}