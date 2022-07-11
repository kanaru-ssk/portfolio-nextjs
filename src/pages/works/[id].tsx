import Head from "next/head";

import type { NextPage, GetStaticProps } from "next";

import { fetchAPI } from "libs/strapi";
import { AboutPageRes, AboutPage } from "types/aboutPage";
import { CommonRes, Common } from "types/common";
import { ProductsRes } from "types/products";
import { WorksRes, Works, Work } from "types/works";

type Props = {
  common: Common;
  about: AboutPage;
  work: Work;
  productsRes: ProductsRes;
  worksRes: WorksRes;
};

const WorksArticle: NextPage<Props> = ({
  common,
  about,
  work,
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

        {/* ogp */}
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={work.basic_seo.ogp_img.data.attributes.url}
        />
        <meta property="og:title" content={work.basic_seo.title} />
        <meta property="og:description" content={work.basic_seo.description} />
        <meta name="twitter:card" content="summary" />

        <title>{work.basic_seo.title}</title>
        <meta name="description" content={work.basic_seo.description} />
      </Head>

      <main className="p-4">
        <div className="h-20"></div>
      </main>
    </>
  );
};

export default WorksArticle;

export const getStaticPaths = async () => {
  const worksRes: WorksRes = await fetchAPI("works", {
    populate: { basic_seo: { populate: "*" } },
  });
  const paths = worksRes.data.map(
    (works: Works) => `/works/${works.attributes.path}`
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const commonRes: CommonRes = await fetchAPI("common", { populate: "*" });
  const aboutRes: AboutPageRes = await fetchAPI("about-page", {
    populate: {
      profile_img: { populate: "*" },
      basic_seo: { populate: "*" },
      sns: { populate: { sns: { populate: "*" } } },
      biography: { populate: "*" },
    },
  });
  const productsRes: ProductsRes = await fetchAPI("products");
  const worksRes: WorksRes = await fetchAPI("works", {
    filters: { path: { $eq: params!.id } },
    populate: { basic_seo: { populate: "*" } },
  });

  const common: Common = commonRes.data.attributes;
  const about: AboutPage = aboutRes.data.attributes;
  const work: Work = worksRes.data[0].attributes;

  return {
    props: {
      common,
      about,
      work,
      productsRes,
      worksRes,
    },
  };
};
