import { gql } from "@apollo/client";
import Head from "next/head";

import type { NextPage, GetStaticProps } from "next";

import Content from "components/common/Content";
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
          content={post.seo.ogpImg ? post.seo.ogpImg.sourceUrl : "/img/ogp.png"}
        />
        <meta
          property="og:title"
          content={post.seo.title ? post.seo.title + " | Kanaru" : "Kanaru"}
        />
        <meta property="og:description" content={post.seo.description} />
        <meta name="twitter:card" content="summary" />

        <title>
          {post.seo.title ? post.seo.title + " | Kanaru" : "Kanaru"}
        </title>
        <meta name="description" content={post.seo.description} />
      </Head>

      <main className="p-4">
        <div className="h-20"></div>
        <h1>{post.title}</h1>
        <Content html={post.content} />
      </main>
    </>
  );
};

export default WorksArticle;

export const getStaticPaths = async () => {
  const GET_WORKS_PATH = gql`
    query getWorksPaths {
      posts(first: 9999, where: { categoryName: "works" }) {
        nodes {
          slug
        }
      }
    }
  `;

  const response = await client.query<WpPostPathsRes>({
    query: GET_WORKS_PATH,
  });

  const paths = response.data.posts.nodes.map((post) => `/works/${post.slug}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const GET_POST = gql`
    query getPost {
      postBy(slug: "${params!.id}") {
        title
        slug
        date
        content
        seo {
          description
          title
          ogpImg {
            sourceUrl
          }
        }
      }
    }
  `;

  const response = await client.query<WpPostRes>({
    query: GET_POST,
  });

  const post = response.data.postBy;

  return {
    props: {
      post,
    },
  };
};
