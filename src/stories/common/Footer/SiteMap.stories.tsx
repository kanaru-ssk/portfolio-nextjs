import { ComponentStory, ComponentMeta } from "@storybook/react";

import SiteMap from "components/common/Footer/SiteMap";

export default {
  component: SiteMap,
} as ComponentMeta<typeof SiteMap>;

const Template: ComponentStory<typeof SiteMap> = () => <SiteMap />;

export const Default = Template.bind({});
