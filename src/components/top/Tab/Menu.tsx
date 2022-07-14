import { useRouter } from "next/router";

type TabStatus = "/about" | "/works" | "/blog";

type Props = {
  name: string;
  path: TabStatus;
  tabStatus: TabStatus;
};

const Tab = ({ name, path, tabStatus }: Props) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.replace(path, path, { shallow: true });
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
