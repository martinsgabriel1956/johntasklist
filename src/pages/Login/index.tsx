import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { ThemeContext } from "../../context/ThemeContext";
import { Eye, EyeClosed } from "phosphor-react";
import { Link } from "react-router-dom";
import { Separator } from "../../components";
import { Toast } from "../../components/UI";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [triggerToast, setTriggerToast] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { theme } = useContext(ThemeContext);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleLogin(data: any) {
    console.log(data);
    changeStatusToast(true);
  }

  const changeStatusToast = (status: boolean) => {
    setTriggerToast(status);
  }

  return (
    <section className=" w-full h-full rounded-s-xl flex flex-col items-center justify-center">
      <h1
        className={clsx("font-bold leading-normal text-[3.5rem] mb-6", {
          "text-dark-title": theme === "dark",
          "text-light-title": theme === "light",
        })}
      >
        John Task List
      </h1>

      <form
        className="lg:max-w-lg max-md:max-w-sm w-full"
        onSubmit={handleSubmit(handleLogin, (error) => console.log({ error }))}
      >
        <div className="mb-6">
          <input
            type="email"
            className={clsx("w-full mx-auto h-12 rounded-lg px-4 ", {
              "bg-dark-purple/30": theme === "dark",
              "bg-dark-text/30": theme === "light",
              "text-white": theme === "dark",
              "text-light-text": theme === "light",
            })}
            placeholder="E-mail"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500 font-bold mt-2 inline-block">The e-mail field is required</span>}
        </div>

        <div className="relative">
          <div className="">
            <input
              type={showPassword ? "password" : "text"}
              className={clsx("w-full mx-auto h-12 rounded-lg px-4", {
                "bg-dark-purple/30": theme === "dark",
                "bg-dark-text/30": theme === "light",
                "text-white": theme === "dark",
                "text-light-text": theme === "light",
              })}
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="text-red-500 font-bold mt-2 inline-block">The password field is required</span>}
          </div>

          <button
            className={clsx("absolute top-3.5 right-4", {
              "text-white": theme === "dark",
              "text-light-text": theme === "light",
            })}
            type="button"
            onClick={handleShowPassword}
          >
            {showPassword ? <Eye size={24} /> : <EyeClosed size={24} />}
          </button>
        </div>


        <button
          disabled={errors.email || errors.password ? true : false}
          type="submit"
          className={clsx("disabled:cursor-not-allowed mt-4 border-2 border-solid  p-2.5 rounded-lg w-full  transition-all disabled:opacity-[0.75]", {
            "border-dark-purple/40": theme === "dark",
            "border-dark-text/90": theme === "light",
            "text-dark-text": theme === "dark",
            "text-light-text": theme === "light",
            // "lg:hover:bg-dark-purple/30": task.trim() !== ""
          })}
        >
          Enter
        </button>

        <div className={clsx("mt-4 mb-6", {
          "text-dark-text": theme === "dark",
          "text-light-text": theme === "light",
        })}>
          <Link
            to="/register"
            className="flex items-center gap-1"
          >
            Don't have an account?
            <span className="font-bold">Sign up</span>
          </Link>
        </div>
        <Separator
          className={clsx("mt-8 mb-4 w-full ", {
            "bg-dark-border": theme === "dark",
            "bg-light-border": theme === "light",
          })}
        />
      </form>
      <div className="flex flex-rol gap-4" >
        <button
          title="Enter with Google"
          type="button"
          className={clsx("disabled:cursor-not-allowed mt-4 border-2 border-solid  p-2.5 rounded-lg  transition-all disabled:opacity-[0.75]", {
            "border-dark-purple/40": theme === "dark",
            "border-dark-text/90": theme === "light",
            "text-dark-text": theme === "dark",
            "text-light-text": theme === "light",
          })}
        >
          <img
            src="https://img.freepik.com/icones-gratis/procurar_318-265146.jpg" alt="Logo do Google"
            className="w-6 h-6"
          />
        </button>
      </div>
      <Toast
        changeStatusToast={setTriggerToast}
        openToast={triggerToast}
        title="User created"
        description="You have successfully created a new user"
      />
    </section>
  )
}