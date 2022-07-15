import { ComponentStory, ComponentMeta } from "@storybook/react";

import Breadcrumbs from "components/common/Breadcrumbs";

export default {
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
);

export const Contact = Template.bind({});
Contact.args = {
  bread: [{ name: "contact" }],
};

export const Works = Template.bind({});
Works.args = {
  bread: [{ name: "works", path: "/works" }, { name: "作品タイトル" }],
};

export const Blog = Template.bind({});
Blog.args = {
  bread: [{ name: "blog", path: "/blog" }, { name: "ブログタイトル" }],
};
