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
    <label
      htmlFor={"radio-" + name}
      onClick={() => {
        router.replace(path, path, { shallow: true });
      }}
      className={
        `${path === tabStatus ? "border-blue " : "border-gray "}` +
        "w-full cursor-pointer border-b py-3 text-center text-base sm:hover:bg-light-gray"
      }
    >
      <input type="radio" name="menu" id={"radio-" + name} className="hidden" />
      {name}
    </label>
  );
};

export default Tab;
