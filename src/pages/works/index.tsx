import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
const EditorJSHtml = require('editorjs-html');

// lib
import { fetchAPI } from 'libs/api';
import { CommonRes, Common } from 'types/common';
import { AboutPageRes, AboutPage } from 'types/aboutPage';
import { WorksPageRes, WorksPage } from 'types/worksPage';

// components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

export const config = { amp: true };

type Props = {
	common: Common;
	about: AboutPage;
	works: WorksPage;
};

const Works: NextPage<Props> = ({ common, about, works }: Props) => {
	const contents: string[] = EditorJSHtml().parse(JSON.parse(works.contents));
	return (
		<>
			<Head>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN + '/works'} />
				<link rel="icon" href={common.favicon.data.attributes.url} />

				<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={works.basic_seo.ogp_img.data.attributes.url} />
				<meta property="og:title" content={works.basic_seo.title} />
				<meta property="og:description" content={works.basic_seo.description} />
				<meta name="twitter:card" content="summary" />

				<title>{works.basic_seo.title}</title>
				<meta name="description" content={works.basic_seo.description} />
			</Head>
			<Header logo={common.header_logo.data.attributes.url} />
			<main className="p-4">
				<div className="h-20"></div>

				{contents.map((value, key) => {
					return <div key={key} dangerouslySetInnerHTML={{ __html: value }}></div>;
				})}
			</main>
			<Footer logo={common.logo_white.data.attributes.url} copyRight={common.copy_right} snsLinks={about.sns} />
		</>
	);
};

export default Works;

export const getStaticProps: GetStaticProps = async () => {
	const commonRes: CommonRes = await fetchAPI('common', { populate: '*' });
	const aboutRes: AboutPageRes = await fetchAPI('about-page', {
		populate: {
			profile_img: { populate: '*' },
			basic_seo: { populate: '*' },
			sns: { populate: { sns: { populate: '*' } } },
			biography: { populate: '*' },
		},
	});
	const worksRes: WorksPageRes = await fetchAPI('works-page', {
		populate: { basic_seo: { populate: '*' } },
	});

	const common: Common = commonRes.data.attributes;
	const about: AboutPage = aboutRes.data.attributes;
	const works: WorksPage = worksRes.data.attributes;
	return {
		props: {
			common,
			about,
			works,
		},
	};
};
