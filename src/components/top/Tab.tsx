import { useState } from "react";

import TabMenu from "./TabMenu";

type TabStatus = "about" | "works" | "blog";

const Tab = () => {
  const [tabStatus, setTabStatus] = useState<TabStatus>("about");
  return (
    <div>
      <nav className="sticky top-12 flex h-12 justify-evenly bg-white md:top-20">
        <TabMenu
          name="about"
          tabStatus={tabStatus}
          setTabStatus={setTabStatus}
        />
        <TabMenu
          name="works"
          tabStatus={tabStatus}
          setTabStatus={setTabStatus}
        />
        <TabMenu
          name="blog"
          tabStatus={tabStatus}
          setTabStatus={setTabStatus}
        />
      </nav>

      {tabStatus === "about" && <div>about</div>}
      {tabStatus === "works" && <div>works</div>}
      {tabStatus === "blog" && <div>blog</div>}
    </div>
  );
};

export default Tab;
