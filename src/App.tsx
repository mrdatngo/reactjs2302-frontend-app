import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import browserRouters from './router/router';

const router = createBrowserRouter(browserRouters);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
