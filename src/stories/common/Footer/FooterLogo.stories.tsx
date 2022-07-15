import { ComponentStory, ComponentMeta } from "@storybook/react";

import FooterLogo from "components/common/Footer/FooterLogo";

export default {
  component: FooterLogo,
} as ComponentMeta<typeof FooterLogo>;

const Template: ComponentStory<typeof FooterLogo> = () => <FooterLogo />;

export const Default = Template.bind({});
