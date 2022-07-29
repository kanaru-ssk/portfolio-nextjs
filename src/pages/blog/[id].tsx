import Head from "next/head";

import type { NextPage, GetStaticProps } from "next";

import Breadcrumbs from "components/common/Breadcrumbs";
import { getPostPathsQuery, getPostQuery } from "constants/graphqlQuery";
import { client } from "libs/wordpress";
import { WpPostRes, Post } from "types/wpPost";
import { WpPostPathsRes } from "types/wpPostPaths";

type Props = {
  post: Post;
};

const BlogArticle: NextPage<Props> = ({ post }: Props) => {
  const title = post.seo.title ? post.seo.title + " | Kanaru" : "Kanaru";
  const description = post.seo.description ? post.seo.description : "";
  const ogpImg = post.seo.ogpImg?.sourceUrl
    ? post.seo.ogpImg.sourceUrl
    : process.env.NEXT_PUBLIC_URL + "/img/ogp.webp";

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL + "/blog/" + post.slug}
        />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogpImg} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />

        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main className="px-4">
        <Breadcrumbs
          bread={[{ name: "blog", path: "/blog" }, { name: post.title }]}
        />
        <h1>{post.title}</h1>
        <article dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    </>
  );
};

export default BlogArticle;

export const getStaticPaths = async () => {
  const response = await client.query<WpPostPathsRes>({
    query: getPostPathsQuery("blog"),
  });

  const paths = response.data.posts.nodes.map((post) => "/blog/" + post.slug);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await client.query<WpPostRes>({
    query: getPostQuery(params!.id),
  });

  const post = response.data.postBy;

  return {
    props: {
      post,
    },
  };
};
