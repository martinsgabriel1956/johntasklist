import './styles/global.css';
import { Home } from "./pages/Home";
import { TasksProvider, ThemeProvider } from './providers';

export function App() {
  return (
    <ThemeProvider>
      <TasksProvider>
        <Home />
      </TasksProvider>
    </ThemeProvider>
  )
}
