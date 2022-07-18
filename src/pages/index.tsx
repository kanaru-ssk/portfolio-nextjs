import { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage, GetStaticProps } from "next";

import Contact from "components/top/Contact";
import Profile from "components/top/Profile";
import Tab from "components/top/Tab";
import { topQuery } from "constants/graphqlQuery";
import { client } from "libs/wordpress";
import { WpTopRes, PostNode, AboutPage, GeneralSettings } from "types/wpTop";

type Props = {
  about: AboutPage;
  general: GeneralSettings;
  aboutContent: string;
  blogPosts: PostNode[];
  blogCount: number;
  worksPosts: PostNode[];
  worksCount: number;
};

const Home: NextPage<Props> = ({
  about,
  general,
  blogPosts,
  blogCount,
  worksPosts,
  worksCount,
}: Props) => {
  const logoStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "佐々木哉瑠",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    logo: process.env.NEXT_PUBLIC_DOMAIN + "/img/logo.svg",
  };

  const router = useRouter();
  const [isContact, setIsContact] = useState<boolean>(false);

  useEffect(() => {
    setIsContact(router.asPath === "/contact");
  }, [router.asPath]);

  return (
    <>
      <Head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_DOMAIN} />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_DOMAIN + "/img/ogp.webp"}
        />
        <meta
          property="og:title"
          content={general.title ? "Kanaru | " + general.title : "Kanaru"}
        />
        <meta property="og:description" content={general.description} />
        <meta name="twitter:card" content="summary" />

        <title>{general.title ? "Kanaru | " + general.title : "Kanaru"}</title>
        <meta name="description" content={general.description} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(logoStructuredData),
          }}
        />
      </Head>

      <main>
        {isContact ? (
          <Contact />
        ) : (
          <>
            <Profile
              bio={about.profile.bio}
              profileImg={about.profile.profileImg.sourceUrl}
              name={about.profile.name}
              nameRoman={about.profile.nameRoman}
              job={about.profile.job}
            />

            <Tab
              aboutContent={about.content}
              worksPosts={worksPosts}
              worksCount={worksCount}
              blogPosts={blogPosts}
              blogCount={blogCount}
            />
          </>
        )}
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.query<WpTopRes>({
    query: topQuery,
  });

  const general = response.data.generalSettings;

  const about: AboutPage = response.data.pageBy;

  const blogPosts: PostNode[] = response.data.blog.nodes;
  const worksPosts: PostNode[] = response.data.works.nodes;

  const blogCategory = response.data.categories.nodes.find(
    (value) => value.name === "blog"
  );
  const blogCount = blogCategory?.count ? blogCategory.count : 0;

  const worksCategory = response.data.categories.nodes.find(
    (value) => value.name === "works"
  );
  const worksCount = worksCategory?.count ? worksCategory.count : 0;

  return {
    props: {
      about,
      general,
      blogPosts,
      blogCount,
      worksPosts,
      worksCount,
    },
  };
};
