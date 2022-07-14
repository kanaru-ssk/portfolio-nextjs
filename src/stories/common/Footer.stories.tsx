import { ComponentStory, ComponentMeta } from "@storybook/react";

import Footer from "components/common/Footer";

export default {
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => <Footer />;

export const Default = Template.bind({});
