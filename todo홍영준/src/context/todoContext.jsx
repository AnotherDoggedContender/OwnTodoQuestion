import axios from "axios";
import { createContext, useState } from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [todoList, setTodoList] = useState([]);

    return (
        <TodoContext.Provider value={{ todoList, setTodoList }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;

export const useTodo = {
    getTodo: () => {
        const response = axios.get("http://localhost:3030/todo").then((res) => {
            return res;
        });
        return response;
    },
    addTodo: ({ id, title, content, token }) => {
        console.log(token);
        axios
            .post(
                "http://localhost:3030/todo",
                {
                    id,
                    title,
                    content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {});
    },
};
