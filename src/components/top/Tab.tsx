import { useState } from "react";

import TabMenu from "./TabMenu";

import About from "components/About";
import Blog from "components/Blog";
import Works from "components/Works";

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

      {tabStatus === "about" && <About />}
      {tabStatus === "works" && <Works />}
      {tabStatus === "blog" && <Blog />}
    </div>
  );
};

export default Tab;
