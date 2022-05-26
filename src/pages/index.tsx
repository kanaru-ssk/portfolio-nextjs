import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

import { fetchAPI } from 'libs/api';

import FirstView from 'components/Home/FirstView';

export const config = { amp: true };

type Props = {
	common: Common;
};

const Home: NextPage<Props> = ({ common }: Props) => {
	return (
		<>
			<Head>
				{/* ogp */}
				<meta property="og:url" content={process.env.NEXT_PUBLIC_MICROCMS_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={process.env.NEXT_PUBLIC_MICROCMS_DOMAIN + '/ogp.png'} />
				<meta property="og:title" content={common.site_title} />
				<meta property="og:description" content="仙台のweb開発エンジニア 佐々木かなるのポートフォリオサイト" />
				<meta name="twitter:card" content="summary" />

				<title>{common.site_title}</title>
				<meta name="description" content="仙台のweb開発エンジニア 佐々木かなるのポートフォリオサイト" />
			</Head>

			<main className="flex items-center h-screen p-4">
				<FirstView catchCopy={common.catch_copy} />
			</main>
		</>
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
