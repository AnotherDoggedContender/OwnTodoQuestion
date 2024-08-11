import axios from "axios";
const TodoApi = {
    getTodo: () => {
        const response = axios.get("http://localhost:3030/todo").then((res) => {
            return res;
        });
        return response;
    },
    addTodo: ({ id, title, content, token }) => {
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
            .then(
                () => {},
                (err) => {
                    console.log(err);
                }
            );
    },
    deleteTodo: (thisId) => {
        axios.delete(`http://localhost:3030/todo/${thisId}`).then((res) => {
            console.log(res);
        });
    },
};

export default TodoApi;
