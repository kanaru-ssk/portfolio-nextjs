import { ComponentStory, ComponentMeta } from "@storybook/react";

import SendError from "components/top/Contact/SendError";

export default {
  component: SendError,
} as ComponentMeta<typeof SendError>;

const Template: ComponentStory<typeof SendError> = () => <SendError />;

export const Default = Template.bind({});
