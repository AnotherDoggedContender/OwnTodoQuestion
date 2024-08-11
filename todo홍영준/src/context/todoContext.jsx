import axios from "axios";
import { createContext, useEffect, useState } from "react";
import TodoApi from "../apis/todo.api";

export const TodoContext = createContext();
const TodoProvider = ({ children }) => {
    const [todoList, setTodoList] = useState([]);
    const useTodo = {
        getTodo: () => {
            TodoApi.getTodo().then((res) => {
                setTodoList(res.data); //todo.jsx에서 useEffect 없이 쓰면 계속 리렌더링 된다.
            });
        },
        addTodo: ({ id, title, content, token }) => {
            TodoApi.addTodo({ id, title, content, token });
        },
        deleteTodo: (thisId) => {
            TodoApi.deleteTodo(thisId); //403 에러가 났다가 안 났다 반복한다.
        },
    };
    return (
        <TodoContext.Provider value={{ todoList, setTodoList, useTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
