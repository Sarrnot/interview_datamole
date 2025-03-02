import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";

import { Checkbox } from "./Checkbox";
import { Form } from "./form";
import { Button } from "./Button";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    margin-left: 15px;
`;

const ActionsDiv = styled.div`
    display: flex;
    margin-left: auto;
`;

export type LiteeItemProp = {
    label: string;
    isDone: boolean;
    onItemLabelEdit: (label: string) => void;
    onItemDoneToggle: (isDone: boolean) => void;
    onItemDelete: () => void;
};

type Mode = "preview" | "edit";

export const ListItem = (props: LiteeItemProp) => {
    const { label, isDone, onItemLabelEdit, onItemDoneToggle, onItemDelete } = props;

    const [mode, setMode] = useState<Mode>("preview");

    const handleEditSubmit = (value: string) => {
        onItemLabelEdit(value);
        setMode("preview");
    };

    return (
        <StyledDiv>
            <Checkbox checked={isDone} onCheckedChange={onItemDoneToggle} />
            <Label>{label}</Label>
            <ActionsDiv>
                <Button onClick={() => onItemDelete()}>
                    <TrashIcon />
                </Button>
                {mode === "preview" ? (
                    <Button onClick={() => setMode("edit")}>
                        <Pencil1Icon />
                    </Button>
                ) : (
                    <Form initialValue={label} onCancel={() => setMode("preview")} onSubmit={handleEditSubmit} />
                )}
            </ActionsDiv>
        </StyledDiv>
    );
};
