import { Home } from "./pages/Home";
import { TasksProvider } from "./providers/TasksProvider";
import './styles/global.css';

export function App() {
  return (
    <TasksProvider>
      <Home />
    </TasksProvider>
  )
}
