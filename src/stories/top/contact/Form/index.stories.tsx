import { ComponentStory, ComponentMeta } from "@storybook/react";

import Form from "components/top/Contact/Form";

export default {
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Default = Template.bind({});
