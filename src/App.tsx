import { QueryClientProvider } from 'react-query';

import './styles/global.css';
import { Home } from "./pages/Home";
import { TasksProvider } from "./providers/TasksProvider";
import { queryClient } from "./services/queryClient";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksProvider>
        <Home />
      </TasksProvider>
    </QueryClientProvider>
  )
}
