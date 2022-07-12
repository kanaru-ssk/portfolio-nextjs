import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import About from "./About";
import Blog from "./Blog";
import Menu from "./Menu";
import Works from "./Works";

import { PostsNode } from "types/wpTop";

type TabStatus = "/about" | "/works" | "/blog";

type Props = {
  aboutContent: string;
  blogPosts: PostsNode[];
  worksPosts: PostsNode[];
};

const Tab = ({ aboutContent, blogPosts, worksPosts }: Props) => {
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
      <nav className="sticky top-12 z-10 flex h-12 justify-evenly bg-white md:top-20">
        <Menu name="about" path="/about" tabStatus={tabStatus} />
        <Menu name="works" path="/works" tabStatus={tabStatus} />
        <Menu name="blog" path="/blog" tabStatus={tabStatus} />
      </nav>

      {tabStatus === "/about" && <About html={aboutContent} />}
      {tabStatus === "/works" && <Works worksPosts={worksPosts} />}
      {tabStatus === "/blog" && <Blog blogPosts={blogPosts} />}
    </div>
  );
};

export default Tab;
