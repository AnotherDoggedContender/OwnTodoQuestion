import { useEffect, useState } from "react";
import styled from "styled-components";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Main = () => {
    const [selectState, setSelectState] = useState();
    console.log(selectState);
    useEffect(() => {
        setSelectState("SignIn");
    }, []);
    const handleSelection = (tabName) => {
        console.log(`선택된 탭: ${tabName}`);
        setSelectState(tabName);
        console.log(`state:${selectState}`);
    };
    const TabArray = [
        {
            tabName: "SignIn",
        },
        {
            tabName: "SignUp",
        },
    ];
    return (
        <S.Wrapper>
            <S.TabContainer>
                <S.Header>
                    {TabArray.map((tab, index) => {
                        return (
                            <S.Tab
                                key={index}
                                $isSelected={selectState === tab.tabName}
                                onClick={() => handleSelection(tab.tabName)}
                            >
                                {tab.tabName}
                            </S.Tab>
                        );
                    })}
                </S.Header>
                {selectState === "SignIn" ? (
                    <SignIn></SignIn>
                ) : (
                    <SignUp
                        $selectState={selectState}
                        $setSelectState={setSelectState}
                    ></SignUp>
                )}
            </S.TabContainer>
        </S.Wrapper>
    );
};

export default Main;

const Wrapper = styled.div`
    height: calc(100vh - 140px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TabContainer = styled.div`
    width: 360px;
    border: 1px solid #999;
`;
const Header = styled.header`
    background-color: #00c7ae;
    display: flex;
`;

const Tab = styled.div`
    width: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    padding: 16px;
    font-weight: bold;
    ${(p) => p.$isSelected && "background-color: #e0e0e0;"}
    &:hover {
        background-color: #fef3e2;
    }
`;

const S = {
    Wrapper,
    TabContainer,
    Header,
    Tab,
};
