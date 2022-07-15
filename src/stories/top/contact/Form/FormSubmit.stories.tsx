import { ComponentStory, ComponentMeta } from "@storybook/react";

import FormSubmit from "components/top/Contact/Form/FormSubmit";

export default {
  component: FormSubmit,
} as ComponentMeta<typeof FormSubmit>;

const Template: ComponentStory<typeof FormSubmit> = (args) => (
  <FormSubmit {...args} />
);

export const Default = Template.bind({});
