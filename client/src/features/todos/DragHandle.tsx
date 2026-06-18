import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import React from "react";
import styled from "styled-components";

const HandleButton = styled.button`
    display: flex;
    align-items: center;
    padding: 0;
    margin-right: 8px;
    border: none;
    background: none;
    color: inherit;
    cursor: grab;
    /* Stop the browser from claiming touch gestures so the pointer sensor can drag. */
    touch-action: none;

    &:active {
        cursor: grabbing;
    }
`;

/** Drag affordance. Carries dnd-kit's `attributes`/`listeners` so the row's other controls stay clickable. */
export const DragHandle = (props: React.ComponentProps<"button">) => (
    <HandleButton type="button" {...props}>
        <DragHandleDots2Icon />
    </HandleButton>
);
