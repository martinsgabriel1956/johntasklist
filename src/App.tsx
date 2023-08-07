import { QueryClientProvider } from 'react-query';

import { Home } from "./pages/Home";
import { TasksProvider } from "./providers/TasksProvider";
import { queryClient } from "./services/queryClient";
import './styles/global.css';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksProvider>
        <Home />
      </TasksProvider>
    </QueryClientProvider>
  )
}
