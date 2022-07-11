import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import TabMenu from "./TabMenu";

import About from "components/About";
import Blog from "components/Blog";
import Works from "components/Works";

type TabStatus = "/about" | "/works" | "/blog";

const Tab = () => {
  const router = useRouter();
  const [tabStatus, setTabStatus] = useState<TabStatus>("/about");

  useEffect(() => {
    if (
      router.asPath === "/about" ||
      router.asPath === "/works" ||
      router.asPath === "/blog"
    )
      setTabStatus(router.asPath);
  }, [router.asPath]);

  return (
    <div>
      <nav className="sticky top-12 flex h-12 justify-evenly bg-white md:top-20">
        <TabMenu name="about" path="/about" tabStatus={tabStatus} />
        <TabMenu name="works" path="/works" tabStatus={tabStatus} />
        <TabMenu name="blog" path="/blog" tabStatus={tabStatus} />
      </nav>

      {tabStatus === "/about" && <About />}
      {tabStatus === "/works" && <Works />}
      {tabStatus === "/blog" && <Blog />}
    </div>
  );
};

export default Tab;
