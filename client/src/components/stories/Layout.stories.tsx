import { Meta, StoryObj } from "@storybook/react";

import { Layout } from "../Layout";

const meta = {
    title: "Layout",
    component: Layout,
} as Meta<typeof Layout>;
export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
    args: {
        children: (
            <>
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>etc.</div>
            </>
        ),
    },
};
