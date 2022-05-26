import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

export const config = { amp: true };

const Works: NextPage = () => {
	return (
		<>
			<Head>
				{/* ogp */}
				<meta property="og:url" content={process.env.NEXT_PUBLIC_MICROCMS_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={process.env.NEXT_PUBLIC_MICROCMS_DOMAIN + '/ogp.png'} />
				<meta property="og:title" content="webエンジニア 佐々木哉瑠(かなる)の公式ホームページ" />
				<meta
					property="og:description"
					content="仙台で活動するweb開発エンジニア 佐々木かなるの公式ホームページです。"
				/>
				<meta name="twitter:card" content="summary" />

				<title>webエンジニア佐々木哉瑠(かなる)の公式ホームページ【作品一覧】</title>
				<meta name="description" content="仙台のweb開発エンジニア 佐々木かなるのポートフォリオサイト" />
			</Head>
			<div className="flex items-center h-screen p-4">works page</div>
		</>
	);
};

export default Works;
