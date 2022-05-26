import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

import { fetchAPI } from 'libs/api';

import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';

export const config = { amp: true };

const Home: NextPage<Props> = ({ common }: Props) => {
	return (
		<div>
			<Head>
				{/* ogp */}
				<meta property="og:url" content="https://kanaru.jp" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="https://kanaru.jp/ogp.png" />
				<meta property="og:title" content={common.site_title} />
				<meta property="og:description" content="仙台のweb開発エンジニア 佐々木かなるのポートフォリオサイト" />
				<meta name="twitter:card" content="summary" />

				<title>{common.site_title}</title>
				<meta name="description" content="仙台のweb開発エンジニア 佐々木かなるのポートフォリオサイト" />
				<link rel="icon" href="/favicon.svg" />
			</Head>

			<Header />

			<main className="bg-red-100">
				<h1 className="p-4">top page</h1>
				<div>{common.catch_copy}</div>
			</main>

			<Footer />
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	const res: APIres = await fetchAPI('common');
	const common = res.data.attributes;
	return {
		props: {
			common,
		},
	};
};

type Props = {
	common: Common;
};

type APIres = {
	data: {
		id: number;
		attributes: Common;
	};
	meta: {};
};

type Common = {
	site_title: string;
	catch_copy: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};
