import { ComponentStory, ComponentMeta } from "@storybook/react";

import Menu from "components/top/Tab/Menu";

export default {
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "about",
  path: "/",
};
