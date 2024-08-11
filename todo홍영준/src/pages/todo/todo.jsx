import styled from "styled-components";
import TodoProvider, { TodoContext } from "../../context/todoContext";
import TodoCard from "./components/TodoCard";
import AddTodoModal from "./components/addTodoModal";
import { useContext, useEffect, useState } from "react";

const Todo = () => {
    function addTodo(title, content) {}
    const { todoList, setTodoList, useTodo } = useContext(TodoContext);
    const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);
    useEffect(() => {
        useTodo.getTodo();
    }, []);

    return (
        <S.Wrapper>
            {isOpenAddTodoModal && (
                <AddTodoModal
                    $setIsOpenAddTodoModal={setIsOpenAddTodoModal}
                ></AddTodoModal>
            )}
            <S.List>
                <S.ListTitle>TODOLIST</S.ListTitle>

                <S.TodoCardWrapper className="round">
                    {todoList.map((el, index) => {
                        return (
                            <TodoCard
                                $id={el.id}
                                $key={el.id}
                                $title={el.title}
                                $content={el.content}
                            ></TodoCard>
                        );
                    })}
                </S.TodoCardWrapper>

                <S.AddButton
                    onClick={() => {
                        addTodo();
                        setIsOpenAddTodoModal(true);
                    }}
                >
                    추가
                </S.AddButton>
            </S.List>
        </S.Wrapper>
    );
};
const Wrapper = styled.div`
    width: 100%;
`;
const List = styled.div`
    position: absolute;
    width: 30%;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    .round {
        border: 1px solid;
        border-radius: 5px;
    }
`;
const ListTitle = styled.div`
    background-color: #00c7ae;
    width: 100%;
    font-size: 32px;
    color: white;
    font-weight: bold;
    text-align: center;
`;

const TodoCardWrapper = styled.div`
    font-size: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid;
    border-radius: 5px;
`;
const AddButton = styled.button`
    width: 100%;
    font-size: 32px;
`;
const S = {
    Wrapper,
    List,
    ListTitle,

    TodoCardWrapper,

    AddButton,
};
export default Todo;
