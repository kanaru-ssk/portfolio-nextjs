import Head from "next/head";

import type { NextPage, GetStaticProps } from "next";

import Blog from "components/common/Blog";
import Breadcrumbs from "components/common/Breadcrumbs";
import Pagination from "components/common/Pagination";
import { getPostsCount, getAllPosts } from "constants/graphqlQuery";
import { blogPerPage } from "constants/pagination";
import { client } from "libs/wordpress";
import { WpAllPostsRes } from "types/wpAllPosts";
import { WpPostsCountRes } from "types/wpPostsCount";
import { PostNode } from "types/wpTop";

type Props = {
  blogPosts: PostNode[];
  pageNum: number;
  blogCount: number;
};

const BlogPage: NextPage<Props> = ({
  blogPosts,
  pageNum,
  blogCount,
}: Props) => {
  const title = "Kanaru | ブログ一覧 ページ" + pageNum;
  const description =
    "webエンジニア佐々木哉瑠のブログ一覧ページです。このページは" +
    pageNum +
    "ページ目です。";

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL + "/blog/page/" + pageNum}
        />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_URL + "/img/ogp.webp"}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />

        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main>
        <Breadcrumbs bread={[{ name: "blog" }]} />
        <Blog blogPosts={blogPosts} />
        <Pagination count={blogCount} category="blog" pageNum={pageNum} />
      </main>
    </>
  );
};

export default BlogPage;

export const getStaticPaths = async () => {
  const response = await client.query<WpPostsCountRes>({
    query: getPostsCount,
  });

  const blogCount = response.data.categories.nodes.find(
    (value) => value.name === "blog"
  )?.count;

  let paths: string[] = [];
  if (typeof blogCount === "number") {
    for (let i = 0; i < blogCount / blogPerPage - 1; i++) {
      paths.push("/blog/page/" + (i + 2).toString());
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await client.query<WpAllPostsRes>({
    query: getAllPosts("blog"),
  });

  const pageNum =
    params && typeof params.id === "string" ? Number(params.id) : 0;

  const blogPosts = response.data.posts.nodes.slice(
    (pageNum - 1) * blogPerPage,
    pageNum * blogPerPage
  );

  const blogCount = response.data.posts.nodes.length;

  return {
    props: {
      blogPosts,
      pageNum,
      blogCount,
    },
  };
};
