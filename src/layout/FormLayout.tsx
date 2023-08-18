import { useContext } from 'react';
import clsx from 'clsx';
import { ThemeContext } from '../context/ThemeContext';
import { Outlet } from 'react-router-dom';
import { ThemeSwitchButton } from '../components';

export function FormLayout() {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={clsx("flex items-center justify-between w-full h-screen max-md:flex-col", {
      "bg-dark-bg": theme === "dark",
      "bg-light-bg": theme === "light",
    })}>
      <section className="w-3/5 h-screen max-md:hidden bg-dark-purple/30 flex items-center justify-center">
        <div className="">
          <img src="/src/assets/completed.svg" alt="fbgd" />
        </div>
      </section>
      <Outlet />
      <ThemeSwitchButton />
    </main>
  );
}