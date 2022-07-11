import { useEffect, useState } from "react";

import { gql } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage, GetStaticProps } from "next";

import Contact from "components/Contact";
import ContactButton from "components/common/ContactButton";
import FirstView from "components/top/FirstView";
import Tab from "components/top/Tab";
import { fetchAPI } from "libs/strapi";
import { client } from "libs/wordpress";
import { AboutPageRes, AboutPage } from "types/aboutPage";
import { CommonRes, Common } from "types/common";
import { TopPageRes, TopPage } from "types/topPage";
import {
  TopWordpressRes,
  PostsNode,
  PagesNode,
  CategoriesNode,
  GeneralSettings,
} from "types/topWordpressRes";

type Props = {
  common: Common;
  top: TopPage;
  about: AboutPage;
  general: GeneralSettings;
  aboutContent: string;
  blogPosts: PostsNode[];
  worksPosts: PostsNode[];
};

const Home: NextPage<Props> = ({
  common,
  top,
  about,
  general,
  aboutContent,
  blogPosts,
  worksPosts,
}: Props) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "佐々木哉瑠",
    url: process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN,
    logo: common.header_logo.data.attributes.url,
  };

  const router = useRouter();

  const [isShowContact, setIsShowContact] = useState<boolean>(false);

  useEffect(() => {
    setIsShowContact(router.asPath === "/contact");
  }, [router.asPath]);

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN}
        />
        <link rel="icon" href={common.favicon.data.attributes.url} />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={top.basic_seo.ogp_img.data.attributes.url}
        />
        <meta property="og:title" content={general.title} />
        <meta property="og:description" content={general.description} />
        <meta name="twitter:card" content="summary" />

        <title>{general.title}</title>
        <meta name="description" content={general.description} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <main>
        <div className="h-12 md:h-20"></div>

        {isShowContact ? (
          <Contact setIsShowContact={setIsShowContact} />
        ) : (
          <>
            <FirstView
              catchCopy={top.catch_copy}
              profileImg={about.profile_img.data.attributes.url}
              name={about.name}
              nameKana={about.name_kana}
              job={about.job}
            />

            <ContactButton setIsShowContact={setIsShowContact} />

            <Tab
              aboutContent={aboutContent}
              blogPosts={blogPosts}
              worksPosts={worksPosts}
            />
          </>
        )}
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const commonRes: CommonRes = await fetchAPI("common", { populate: "*" });
  const topRes: TopPageRes = await fetchAPI("top-page", {
    populate: { basic_seo: { populate: "*" } },
  });
  const aboutRes: AboutPageRes = await fetchAPI("about-page", {
    populate: {
      profile_img: { populate: "*" },
      basic_seo: { populate: "*" },
      sns: { populate: { sns: { populate: "*" } } },
      biography: { populate: "*" },
    },
  });

  const GET_ALL_POSTS = gql`
    query getPost {
      generalSettings {
        title
        description
      }
      pages {
        nodes {
          title
          content
        }
      }
      posts(first: 20) {
        nodes {
          id
          title
          date
          featuredImage {
            node {
              link
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
  `;

  const response = await client.query<TopWordpressRes>({
    query: GET_ALL_POSTS,
  });
  const general = response.data.generalSettings;
  const pages: PagesNode[] = response.data.pages.nodes;
  const aboutPage: PagesNode | undefined = pages.find((value) => {
    return value.title === "about";
  });
  const aboutContent: string = aboutPage ? aboutPage.content : "";
  const posts: PostsNode[] = response.data.posts.nodes;

  const blogPosts: PostsNode[] = posts.filter((value) => {
    return value.categories.nodes[0].name === "blog";
  });
  const worksPosts: PostsNode[] = posts.filter((value) => {
    return value.categories.nodes[0].name === "works";
  });

  const common: Common = commonRes.data.attributes;
  const top: TopPage = topRes.data.attributes;
  const about: AboutPage = aboutRes.data.attributes;
  return {
    props: {
      common,
      top,
      about,
      general,
      blogPosts,
      worksPosts,
      aboutContent,
    },
  };
};
