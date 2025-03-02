import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Form } from "./form";
import { Button } from "./Button";

const StyledDiv = styled.header`
    display: flex;
    justify-content: space-between;
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
                <Button onClick={() => setMode("addTodo")}>
                    <PlusIcon />
                </Button>
            ) : (
                <Form initialValue="" onCancel={() => setMode("menu")} onSubmit={handleSubmit}></Form>
            )}
        </StyledDiv>
    );
};
