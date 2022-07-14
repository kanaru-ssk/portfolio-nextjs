import { ComponentStory, ComponentMeta } from "@storybook/react";

import Profile from "components/top/Profile";

export default {
  component: Profile,
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = (args) => (
  <Profile {...args} />
);

export const Default = Template.bind({});
Default.args = {
  profileImg:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDEwMHYxMDBIMHoiLz48cGF0aCBkPSJNMjUuNDA5IDQ4LjYyNkwyMCA2OC41NDJsNTQuNTkxLTE3Ljg1MUw4MCAzMS40NTl6IiBmaWxsPSIjMjMyYzkzIi8+PC9zdmc+",
  name: "佐々木 哉瑠",
  nameKana: "Sasaki Kanaru",
  job: "webエンジニア",
  bio: "はじめまして、webエンジニアの佐々木哉瑠です。\nホームページ制作、webアプリ開発を承っています。",
};
