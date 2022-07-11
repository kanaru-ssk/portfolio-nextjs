import Head from "next/head";

import type { NextPage, GetStaticProps } from "next";

import Footer from "components/common/Footer";
import { fetchAPI } from "libs/strapi";
import { AboutPageRes, AboutPage } from "types/aboutPage";
import { CommonRes, Common } from "types/common";
import { ProductsRes } from "types/products";
import { WorksRes } from "types/works";
import { WorksPageRes, WorksPage } from "types/worksPage";

type Props = {
  common: Common;
  about: AboutPage;
  works: WorksPage;
  productsRes: ProductsRes;
  worksRes: WorksRes;
};

const Works: NextPage<Props> = ({
  common,
  about,
  works,
  productsRes,
  worksRes,
}: Props) => {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN + "/works"}
        />
        <link rel="icon" href={common.favicon.data.attributes.url} />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={works.basic_seo.ogp_img.data.attributes.url}
        />
        <meta property="og:title" content={works.basic_seo.title} />
        <meta property="og:description" content={works.basic_seo.description} />
        <meta name="twitter:card" content="summary" />

        <title>{works.basic_seo.title}</title>
        <meta name="description" content={works.basic_seo.description} />
      </Head>

      <main className="p-4">
        <div className="h-20"></div>
      </main>
      <Footer copyRight={common.copy_right} snsLinks={about.sns} />
    </>
  );
};

export default Works;

export const getStaticProps: GetStaticProps = async () => {
  const commonRes: CommonRes = await fetchAPI("common", { populate: "*" });
  const aboutRes: AboutPageRes = await fetchAPI("about-page", {
    populate: {
      profile_img: { populate: "*" },
      basic_seo: { populate: "*" },
      sns: { populate: { sns: { populate: "*" } } },
      biography: { populate: "*" },
    },
  });
  const worksPageRes: WorksPageRes = await fetchAPI("works-page", {
    populate: { basic_seo: { populate: "*" } },
  });
  const productsRes: ProductsRes = await fetchAPI("products");
  const worksRes: WorksRes = await fetchAPI("works");

  const common: Common = commonRes.data.attributes;
  const about: AboutPage = aboutRes.data.attributes;
  const works: WorksPage = worksPageRes.data.attributes;
  return {
    props: {
      common,
      about,
      works,
      productsRes,
      worksRes,
    },
  };
};
