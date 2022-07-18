import Head from "next/head";

import type { NextPage, GetStaticProps } from "next";

import Breadcrumbs from "components/common/Breadcrumbs";
import Pagination from "components/common/Pagination";
import Works from "components/common/Works";
import { getPostsCount, getAllPosts } from "constants/graphqlQuery";
import { worksPerPage } from "constants/pagination";
import { client } from "libs/wordpress";
import { WpAllPostsRes } from "types/wpAllPosts";
import { WpPostsCountRes } from "types/wpPostsCount";
import { PostNode } from "types/wpTop";

type Props = {
  worksPosts: PostNode[];
  pageNum: number;
  worksCount: number;
};

const BlogPage: NextPage<Props> = ({
  worksPosts,
  pageNum,
  worksCount,
}: Props) => {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL + "/works/page/" + pageNum}
        />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_URL + "/img/ogp.webp"}
        />
        <meta
          property="og:title"
          content={"Kanaru | works一覧 ページ" + pageNum}
        />
        <meta
          property="og:description"
          content={
            "webエンジニア佐々木哉瑠のworks一覧ページです。このページは" +
            pageNum +
            "ページ目です。"
          }
        />
        <meta name="twitter:card" content="summary" />

        <title>{"Kanaru | works一覧 ページ" + pageNum}</title>
        <meta
          name="description"
          content={
            "webエンジニア佐々木哉瑠のworks一覧ページです。このページは" +
            pageNum +
            "ページ目です。"
          }
        />
      </Head>

      <main>
        <Breadcrumbs bread={[{ name: "works" }]} />
        <Works worksPosts={worksPosts} />
        <Pagination count={worksCount} category="works" pageNum={pageNum} />
      </main>
    </>
  );
};

export default BlogPage;

export const getStaticPaths = async () => {
  const response = await client.query<WpPostsCountRes>({
    query: getPostsCount,
  });

  const worksCount = response.data.categories.nodes.find(
    (value) => value.name === "works"
  )?.count;

  let paths: string[] = [];
  if (typeof worksCount === "number") {
    for (let i = 0; i < worksCount / worksPerPage - 1; i++) {
      paths.push("/works/page/" + (i + 2).toString());
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await client.query<WpAllPostsRes>({
    query: getAllPosts("works"),
  });

  const pageNum =
    params && typeof params.id === "string" ? Number(params.id) : 0;

  const worksPosts = response.data.posts.nodes.slice(
    (pageNum - 1) * worksPerPage,
    pageNum * worksPerPage
  );

  const worksCount = response.data.posts.nodes.length;

  return {
    props: {
      worksPosts,
      pageNum,
      worksCount,
    },
  };
};
