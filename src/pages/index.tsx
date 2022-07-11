import { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage, GetStaticProps } from "next";

import Contact from "components/Contact";
import ContactButton from "components/common/ContactButton";
import FirstView from "components/top/FirstView";
import Tab from "components/top/Tab";
import { fetchAPI } from "libs/strapi";
import { AboutPageRes, AboutPage } from "types/aboutPage";
import { CommonRes, Common } from "types/common";
import { ProductsRes } from "types/products";
import { TopPageRes, TopPage } from "types/topPage";
import { WorksRes } from "types/works";

type Props = {
  common: Common;
  top: TopPage;
  about: AboutPage;
  productsRes: ProductsRes;
  worksRes: WorksRes;
};

const Home: NextPage<Props> = ({ common, top, about }: Props) => {
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
        <meta property="og:title" content={top.basic_seo.title} />
        <meta property="og:description" content={top.basic_seo.description} />
        <meta name="twitter:card" content="summary" />

        <title>{top.basic_seo.title}</title>
        <meta name="description" content={top.basic_seo.description} />

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

            <Tab />
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
  const productsRes: ProductsRes = await fetchAPI("products", {
    populate: { basic_seo: { populate: "*" }, eye_catch: { populate: "*" } },
  });
  const worksRes: WorksRes = await fetchAPI("works", {
    populate: { basic_seo: { populate: "*" }, eye_catch: { populate: "*" } },
  });

  const common: Common = commonRes.data.attributes;
  const top: TopPage = topRes.data.attributes;
  const about: AboutPage = aboutRes.data.attributes;
  return {
    props: {
      common,
      top,
      about,
      productsRes,
      worksRes,
    },
  };
};
