import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const SignIn = () => {
    const navigate = useNavigate();
    const emailRef = useRef("");
    const pwdRef = useRef("");
    const handlePressSignIn = (event) => {
        event.preventDefault();

        const inputEmail = emailRef.current.value;
        const inputPassword = pwdRef.current.value;
        if (!inputEmail.trim() || !inputPassword.trim()) return;

        // if (email === "test" && password === "test") return navigate("/todo");
        // 1. axios.post의 body에 이메일과 비밀번호를 실어서 백엔드에 요청한다.
        // 2. 백엔드 요청 결과가 성공하면 navigate한다.
        axios
            .post("http://localhost:3030/user/sign-in", {
                email: inputEmail,
                password: inputPassword,
            })
            .then((res) => {
                console.log(res);
                if (res.data.ok === true) {
                    navigate("/todo");
                } else {
                    alert("아이디와 비밀번호를 다시 확인하세요");
                }
            });
    };
    return (
        <S.Form onSubmit={handlePressSignIn}>
            <input
                type="text"
                placeholder="이메일을 입력하세요"
                ref={emailRef}
            />
            <input
                type="text"
                placeholder="패스워드를 입력하세요"
                ref={pwdRef}
            />
            <button>로그인</button>
        </S.Form>
    );
};

export default SignIn;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const S = {
    Form,
};
