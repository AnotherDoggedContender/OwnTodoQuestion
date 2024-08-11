import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { TodoContext } from "../../../context/todoContext";

const TodoCard = ({ $id, $key, $title, $content }) => {
    const { todoList, setTodoList, useTodo } = useContext(TodoContext);
    //todoList 수정
    const [isEdit, setIsEdit] = useState(false);
    const editContentRef = useRef("");
    const onClickEdit = () => {
        if (!isEdit) {
            setIsEdit(true);
        } else {
            editTodoList($id, editContentRef.current.value);
            setIsEdit(false);
        }
    };
    const editTodoList = (thisId, content) => {
        const editTodo = todoList.find((el) => {
            return el.id === thisId;
        });
        editTodo.content = content;
        console.log(todoList);
        setTodoList([...todoList]);
    };
    //todoList 수정 끝
    //todoList 삭제
    const onClickDelete = (thisId) => {
        useTodo.deleteTodo(thisId);
        useTodo.getTodo();
    };
    return (
        <S.TodoContainer>
            <S.TodoContentsContainer $key={$key}>
                <div className="textDisplay round">{$title}</div>

                <div className="textDisplay round">
                    {isEdit ? <input ref={editContentRef}></input> : $content}
                </div>
            </S.TodoContentsContainer>
            <S.CardButtonContainer className="round">
                <S.CardButton onClick={onClickEdit}>수정</S.CardButton>
                <S.CardButton
                    onClick={() => {
                        onClickDelete($id);
                    }}
                >
                    삭제
                </S.CardButton>
            </S.CardButtonContainer>
        </S.TodoContainer>
    );
};
export default TodoCard;
const TodoContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
const TodoContentsContainer = styled.div`
    width: 75%;
    .textDisplay {
        min-height: 50px;
        width: 100%;
    }
`;

const CardButtonContainer = styled.div`
    width: 25%;
`;
const CardButton = styled.button`
    width: 100%;
    height: 50%;
`;

const S = {
    TodoContainer,
    TodoContentsContainer,

    CardButtonContainer,
    CardButton,
};
