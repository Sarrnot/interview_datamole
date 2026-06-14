import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { List } from "../List";
import { ListItem, LiteeItemProp } from "../ListItem";

const meta = {
    title: "List",
    component: List,
} as Meta<typeof List>;
export default meta;

type Story = StoryObj<typeof List>;

const emptyHandlers: Pick<LiteeItemProp, "onItemLabelEdit" | "onItemDoneToggle" | "onItemDelete"> = {
    onItemLabelEdit: action("Edit requested"),
    onItemDoneToggle: action("Done state change requested"),
    onItemDelete: action("Removal requested"),
};

export const WithItems: Story = {
    args: {
        children: [
            <ListItem {...emptyHandlers} label={"Lorem ipsum dolor"} isDone={false} />,
            <ListItem {...emptyHandlers} label={"Nullam Adipiscing Ridiculus Fusce"} isDone={false} />,
            <ListItem {...emptyHandlers} label={"Mattis Tristique Parturient "} isDone={true} />,
        ],
    },
};
