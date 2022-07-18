import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import About from "./About";
import Menu from "./Menu";

import Blog from "components/common/Blog";
import Loading from "components/common/Loading";
import Pagination from "components/common/Pagination";
import Works from "components/common/Works";
import { PostNode } from "types/wpTop";

export type TabStatus = "/" | "/works" | "/blog";

type Props = {
  aboutContent: string;
  blogPosts: PostNode[];
  blogCount: number;
  worksPosts: PostNode[];
  worksCount: number;
};

const Tab = ({
  aboutContent,
  blogPosts,
  blogCount,
  worksPosts,
  worksCount,
}: Props) => {
  const router = useRouter();
  const [tabStatus, setTabStatus] = useState<TabStatus | undefined>(undefined);

  useEffect(() => {
    if (/^\/blog/.test(router.asPath)) {
      setTabStatus("/blog");
    } else if (/^\/works/.test(router.asPath)) {
      setTabStatus("/works");
    } else {
      setTabStatus("/");
    }
  }, [router.asPath]);

  return (
    <div>
      <nav className="sticky top-12 z-10 flex h-12 justify-evenly bg-white md:top-20">
        <Menu name="about" path="/" tabStatus={tabStatus} />
        <Menu name="works" path="/works" tabStatus={tabStatus} />
        <Menu name="blog" path="/blog" tabStatus={tabStatus} />
      </nav>

      {!tabStatus && <Loading />}
      {tabStatus === "/" && <About html={aboutContent} />}
      {tabStatus === "/works" && (
        <>
          <Works worksPosts={worksPosts} />
          <Pagination count={worksCount} category="works" pageNum={1} />
        </>
      )}
      {tabStatus === "/blog" && (
        <>
          <Blog blogPosts={blogPosts} />
          <Pagination count={blogCount} category="blog" pageNum={1} />
        </>
      )}
    </div>
  );
};

export default Tab;
