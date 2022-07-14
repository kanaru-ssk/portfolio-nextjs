import { ComponentStory, ComponentMeta } from "@storybook/react";

import SendSuccess from "components/top/Contact/SendSuccess";

export default {
  component: SendSuccess,
} as ComponentMeta<typeof SendSuccess>;

const Template: ComponentStory<typeof SendSuccess> = () => <SendSuccess />;

export const Default = Template.bind({});
