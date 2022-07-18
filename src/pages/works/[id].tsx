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

const WorksArticle: NextPage<Props> = ({ post }: Props) => {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={
            process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN + "/blog/" + post.slug
          }
        />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={
            post.seo.ogpImg?.sourceUrl
              ? post.seo.ogpImg.sourceUrl
              : process.env.NEXT_PUBLIC_DOMAIN + "/img/ogp.webp"
          }
        />
        <meta
          property="og:title"
          content={post.seo.title ? post.seo.title + " | Kanaru" : "Kanaru"}
        />
        <meta
          property="og:description"
          content={post.seo.description ? post.seo.description : ""}
        />
        <meta name="twitter:card" content="summary" />

        <title>
          {post.seo.title ? post.seo.title + " | Kanaru" : "Kanaru"}
        </title>
        <meta
          name="description"
          content={post.seo.description ? post.seo.description : ""}
        />
      </Head>

      <main className="px-4">
        <Breadcrumbs
          bread={[{ name: "works", path: "/works" }, { name: post.title }]}
        />
        <h1>{post.title}</h1>
        <article dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    </>
  );
};

export default WorksArticle;

export const getStaticPaths = async () => {
  const response = await client.query<WpPostPathsRes>({
    query: getPostPathsQuery("works"),
  });

  const paths = response.data.posts.nodes.map((post) => "/works/" + post.slug);

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
