import { QueryClientProvider } from 'react-query';
import './styles/global.css';
import { Home } from "./pages/Home";
import { TasksProvider, ThemeProvider } from './providers';
import { queryClient } from "./services/queryClient";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TasksProvider>
          <Home />
        </TasksProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
