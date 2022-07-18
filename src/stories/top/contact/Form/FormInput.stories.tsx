import { ComponentStory, ComponentMeta } from "@storybook/react";

import FormInput from "components/top/Contact/Form/FormInput";

export default {
  component: FormInput,
} as ComponentMeta<typeof FormInput>;

const Template: ComponentStory<typeof FormInput> = (args) => (
  <FormInput {...args} />
);

export const Default = Template.bind({});
