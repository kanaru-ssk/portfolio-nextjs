import type { NextPage, GetStaticProps } from "next";

import A from "components/common/A";
import Footer from "components/common/Footer";
import { fetchAPI } from "libs/strapi";
import { AboutPageRes, AboutPage } from "types/aboutPage";
import { CommonRes, Common } from "types/common";
import { ProductsRes } from "types/products";
import { WorksRes } from "types/works";

type Props = {
  common: Common;
  about: AboutPage;
  productsRes: ProductsRes;
  worksRes: WorksRes;
};

const Custom404: NextPage<Props> = ({
  common,
  about,
  productsRes,
  worksRes,
}: Props) => {
  return (
    <>
      <main className="p-4">
        <div className="h-20"></div>
        <h1>404 Not Found</h1>
        <p>申し訳ございません。お探しのページは見つかりませんでした。</p>
        <div className="py-8">
          <A title="トップページに戻る" url="/" />
        </div>
      </main>
      <Footer copyRight={common.copy_right} snsLinks={about.sns} />
    </>
  );
};

export default Custom404;

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
  const productsRes: ProductsRes = await fetchAPI("products");
  const worksRes: WorksRes = await fetchAPI("works");

  const common: Common = commonRes.data.attributes;
  const about: AboutPage = aboutRes.data.attributes;
  return {
    props: {
      common,
      about,
      productsRes,
      worksRes,
    },
  };
};
