import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ContactButton from "components/top/ContactButton";

export default {
  component: ContactButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ContactButton>;

const Template: ComponentStory<typeof ContactButton> = (args) => (
  <ContactButton {...args} />
);

export const Default = Template.bind({});
