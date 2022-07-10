import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import A from "components/common/A";

export default {
  component: A,
} as ComponentMeta<typeof A>;

const Template: ComponentStory<typeof A> = (args) => <A {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "リンクタイトル",
  url: "https://kanaru.jp",
};
