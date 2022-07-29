import Head from "next/head";

import type { NextPage, GetStaticProps } from "next";

import { privacyQuery } from "constants/graphqlQuery";
import { client } from "libs/wordpress";
import { WpPrivacyRes, Privacy } from "types/wpPrivacy";

type Props = {
  privacy: Privacy;
};

const Privacy: NextPage<Props> = ({ privacy }: Props) => {
  const title = "プライバシーポリシー | Kanaru";
  const description =
    "佐々木哉瑠HPのプライバシーポリシーについて、個人情報保護に関する基本方針などをご案内しています。";

  return (
    <>
      <Head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_URL + "/privacy"} />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_URL + "/img/ogp.webp"}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />

        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main className="min-h-[75vh] px-4">
        <h1>プライバシーポリシー</h1>
        <article dangerouslySetInnerHTML={{ __html: privacy.content }} />
      </main>
    </>
  );
};

export default Privacy;

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.query<WpPrivacyRes>({
    query: privacyQuery,
  });

  return {
    props: {
      privacy: response.data.privacy,
    },
  };
};
