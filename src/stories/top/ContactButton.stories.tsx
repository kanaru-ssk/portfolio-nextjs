import { ComponentStory, ComponentMeta } from "@storybook/react";

import ContactButton from "components/top/Profile/ContactButton";

export default {
  component: ContactButton,
} as ComponentMeta<typeof ContactButton>;

const Template: ComponentStory<typeof ContactButton> = () => <ContactButton />;

export const Default = Template.bind({});
