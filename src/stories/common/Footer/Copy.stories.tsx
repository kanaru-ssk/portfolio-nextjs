import { ComponentStory, ComponentMeta } from "@storybook/react";

import Copy from "components/common/Footer/CopyLight";

export default {
  component: Copy,
} as ComponentMeta<typeof Copy>;

const Template: ComponentStory<typeof Copy> = () => <Copy />;

export const Default = Template.bind({});
