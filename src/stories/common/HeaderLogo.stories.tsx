import { ComponentStory, ComponentMeta } from "@storybook/react";

import HeaderLogo from "components/common/HeaderLogo";

export default {
  component: HeaderLogo,
} as ComponentMeta<typeof HeaderLogo>;

const Template: ComponentStory<typeof HeaderLogo> = () => <HeaderLogo />;

export const Default = Template.bind({});
