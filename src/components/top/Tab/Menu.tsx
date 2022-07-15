import { useRouter } from "next/router";

import { TabStatus } from "./index";

type Props = {
  name: string;
  path: TabStatus;
  tabStatus: TabStatus | undefined;
};

const Tab = ({ name, path, tabStatus }: Props) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        path ? router.replace(path, path, { shallow: true }) : null;
      }}
      className={
        `${path === tabStatus ? "border-blue font-bold " : "border-gray "}` +
        "w-full border-b sm:hover:bg-light-gray"
      }
    >
      {name}
    </button>
  );
};

export default Tab;
