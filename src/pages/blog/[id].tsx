import { gql } from "@apollo/client";
import Head from "next/head";

import type { NextPage, GetStaticProps } from "next";

import Content from "components/common/Content";
import { client } from "libs/wordpress";
import { WpBlogPathRes } from "types/wpBlogPath";
import { WpPostRes, Post } from "types/wpPost";

type Props = {
  post: Post;
};

const WorksArticle: NextPage<Props> = ({ post }: Props) => {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN + "/blog/"}
        />
        <link rel="icon" href="/favicon.svg" />

        {/* ogp */}
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={post.seo.ogpImg ? post.seo.ogpImg.sourceUrl : "/img/ogp.png"}
        />
        <meta
          property="og:title"
          content={post.seo.title ? post.seo.title : ""}
        />
        <meta
          property="og:description"
          content={post.seo.description ? post.seo.description : ""}
        />
        <meta name="twitter:card" content="summary" />

        <title>{post.seo.title}</title>
        <meta
          name="description"
          content={post.seo.description ? post.seo.description : ""}
        />
      </Head>

      <main className="p-4">
        <div className="h-20"></div>
        <Content html={post.content} />
      </main>
    </>
  );
};

export default WorksArticle;

export const getStaticPaths = async () => {
  const GET_BLOG_PATH = gql`
    query getBlogs {
      posts(first: 9999, where: { categoryName: "blog" }) {
        nodes {
          slug
        }
      }
    }
  `;

  const response = await client.query<WpBlogPathRes>({
    query: GET_BLOG_PATH,
  });

  const paths = response.data.posts.nodes.map((post) => `/blog/${post.slug}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const GET_POST = gql`
    query getPost {
      postBy(slug: "${params!.id}") {
        seo {
          description
          title
          ogpImg {
            sourceUrl
          }
        }
        slug
        content
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
