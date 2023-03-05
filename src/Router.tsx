import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Animal } from "./components/Animal/Animal";
import { AnimalList } from "./components/AnimalList/AnimalList";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <AnimalList />,
        },
        {
          path: "/animals",
          element: <AnimalList />,
        },
        {
          path: "/animal/:id",
          element: <Animal />,
        },
      ],
    },
  ]);