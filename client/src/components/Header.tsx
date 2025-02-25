import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Form } from "./form";

const StyledDiv = styled.header`
    display: flex;

    button {
        all: unset;

        width: 25px;
        height: 25px;

        background-color: ${(props) => props.theme.colors.grass9};
        border: 1px solid;
        border-color: ${(props) => props.theme.colors.olive9};
        border-radius: 50%;

        color: #fff;
    }
`;

type HeaderProps = {
    children: React.ReactNode;
    onItemAdd: (label: string) => void;
};

type Mode = "menu" | "addTodo";

export const Header = (props: HeaderProps) => {
    const { children, onItemAdd } = props;

    const [mode, setMode] = useState<Mode>("menu");

    const handleSubmit = (value: string) => {
        onItemAdd(value);
        setMode("menu");
    };

    return (
        <StyledDiv>
            <h1>{children}</h1>
            {mode === "menu" ? (
                <button onClick={() => setMode("addTodo")}>
                    <PlusIcon />
                </button>
            ) : (
                <Form initialValue="" onCancel={() => setMode("menu")} onSubmit={handleSubmit}></Form>
            )}
        </StyledDiv>
    );
};
