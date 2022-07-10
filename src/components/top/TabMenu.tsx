type TabStatus = "about" | "works" | "blog";

type Props = {
  name: TabStatus;
  tabStatus: TabStatus;
  setTabStatus: React.Dispatch<React.SetStateAction<TabStatus>>;
};

const Tab = ({ name, tabStatus, setTabStatus }: Props) => {
  return (
    <label
      htmlFor={"radio-" + name}
      onClick={() => setTabStatus(name)}
      className={
        `${name === tabStatus ? "border-blue " : "border-gray "}` +
        "w-full cursor-pointer border-b py-3 text-center text-base hover:bg-light-gray"
      }
    >
      <input type="radio" name="menu" id={"radio-" + name} className="hidden" />
      {name}
    </label>
  );
};

export default Tab;
