import { ComponentStory, ComponentMeta } from "@storybook/react";

import Sns from "components/common/Footer/Sns";

export default {
  component: Sns,
} as ComponentMeta<typeof Sns>;

const Template: ComponentStory<typeof Sns> = () => <Sns />;

export const Default = Template.bind({});
