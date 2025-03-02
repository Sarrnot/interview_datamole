import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Cross1Icon } from "@radix-ui/react-icons";

const meta = {
    title: "Button",
    component: Button,
    argTypes: {
        onClick: { action: "Button clicked" },
    },
} as Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof Button>;

export const IconOnly: Story = {
    args: {
        children: <Cross1Icon />,
    },
};
