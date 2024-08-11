import axios from "axios";
import { useRef } from "react";
import styled from "styled-components";

const SignUp = ({ $setSelectState }) => {
    const handlePressSignUp = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const pwd = pwdRef.current.value;
        const pwdConfirm = pwdConfirmRef.current.value;
        if (pwd === pwdConfirm) {
            // 1. axios.post로 SignUp에 아이디와 비밀번호를 전송한다.
            // 2. 환영 메시지를 띄운다.
            axios
                .post("http://localhost:3030/user/sign-up", {
                    email,
                    password: pwd,
                })
                .then((res) => {
                    if (res.data.ok === true) {
                        alert(`${email}님 환영합니다!`);
                        $setSelectState("SignIn");
                    } else {
                        alert(res.data.message);
                    }
                });
        } else {
            alert("비밀번호가 일치하지 않습니다");
        }
    };
    const emailRef = useRef("");
    const pwdRef = useRef("");
    const pwdConfirmRef = useRef("");
    return (
        <S.Form onSubmit={handlePressSignUp}>
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
            <input
                type="text"
                placeholder="패스워드를 다시 입력해주세요"
                ref={pwdConfirmRef}
            />
            <button>회원가입</button>
        </S.Form>
    );
};
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const S = {
    Form,
};

export default SignUp;
