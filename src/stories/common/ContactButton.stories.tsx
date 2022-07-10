import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ContactButton from "components/common/ContactButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: ContactButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ContactButton>;

const Template: ComponentStory<typeof ContactButton> = () => <ContactButton />;

export const Default = Template.bind({});
