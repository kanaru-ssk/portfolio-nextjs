import { ComponentStory, ComponentMeta } from "@storybook/react";

import Contact from "components/top/Contact";

export default {
  component: Contact,
} as ComponentMeta<typeof Contact>;

const Template: ComponentStory<typeof Contact> = () => <Contact />;

export const Default = Template.bind({});
