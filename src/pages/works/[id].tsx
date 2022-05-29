import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
const EditorJSHtml = require('editorjs-html');

// lib
import { fetchAPI } from 'libs/api';
import { CommonRes, Common } from 'types/common';
import { AboutPageRes, AboutPage } from 'types/aboutPage';
import { WorksRes, Works, Work } from 'types/works';

// components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

export const config = { amp: true };

type Props = {
	common: Common;
	about: AboutPage;
	work: Work;
};

const WorksArticle: NextPage<Props> = ({ common, about, work }: Props) => {
	const contents: string[] = EditorJSHtml().parse(JSON.parse(work.contents));
	return (
		<>
			<Head>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN + '/works'} />
				<link rel="icon" href={common.favicon.data.attributes.url} />

				{/* ogp */}
				<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={work.ogp_img.data.attributes.url} />
				<meta property="og:title" content={work.title} />
				<meta property="og:description" content={work.description} />
				<meta name="twitter:card" content="summary" />

				<title>{work.title}</title>
				<meta name="description" content={work.description} />
			</Head>

			<Header logo={common.header_logo.data.attributes.url} />
			<main className="p-4">
				<div className="h-20"></div>

				{contents.map((value, key) => {
					return <div key={key} dangerouslySetInnerHTML={{ __html: value }}></div>;
				})}
			</main>
			<Footer logo={common.logo_white.data.attributes.url} copyRight={common.copy_right} snsLinks={about.links} />
		</>
	);
};

export default WorksArticle;

export const getStaticPaths = async () => {
	const worksRes: WorksRes = await fetchAPI('works');
	const paths = worksRes.data.map((works: Works) => `/works/${works.attributes.path}`);
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const commonRes: CommonRes = await fetchAPI('common', { populate: '*' });
	const aboutRes: AboutPageRes = await fetchAPI('about-page', {
		populate: { links: { populate: '*' }, profile_img: { populate: '*' }, ogp_img: { populate: '*' } },
	});
	const worksRes: WorksRes = await fetchAPI('works', { filter: { path: params!.id }, populate: '*' });

	const common: Common = commonRes.data.attributes;
	const about: AboutPage = aboutRes.data.attributes;
	const work: Work = worksRes.data[0].attributes;
	return {
		props: {
			common,
			about,
			work,
		},
	};
};
