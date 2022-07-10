import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import MoreButton from "components/common/MoreButton";

export default {
  component: MoreButton,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof MoreButton>;

const Template: ComponentStory<typeof MoreButton> = (args) => (
  <MoreButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  url: "https://kanaru.jp",
};
