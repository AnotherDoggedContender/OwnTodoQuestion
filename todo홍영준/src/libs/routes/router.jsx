import { createBrowserRouter } from "react-router-dom";
import Main from "../../pages/main/main";
import Todo from "../../pages/todo/todo";
import TodoProvider from "../../context/todoContext";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
    },
    {
        path: "/todo",
        element: (
            <TodoProvider>
                <Todo></Todo>
            </TodoProvider>
        ),
    },
]);

export default router;
