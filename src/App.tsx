import { RouterProvider } from 'react-router-dom';
import * as Toast from '@radix-ui/react-toast';
import './styles/global.css';
import { TasksProvider, ThemeProvider } from './providers';
import { router } from './router';

export function App() {
  return (
    <ThemeProvider>
      <TasksProvider>
        <Toast.Provider duration={5000} swipeDirection='left'>
          <RouterProvider router={router} />
        </Toast.Provider>
      </TasksProvider>
    </ThemeProvider>
  )
}
