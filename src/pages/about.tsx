import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

// lib
import { fetchAPI } from 'libs/api';
import { CommonRes, Common } from 'types/common';
import { AboutPageRes, AboutPage } from 'types/aboutPage';

// components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import AboutSection from 'components/Home/AboutSection';

export const config = { amp: true };

type Props = {
	common: Common;
	about: AboutPage;
};

const About: NextPage<Props> = ({ common, about }: Props) => {
	return (
		<>
			<Head>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_DOMAIN} />
				<link rel="icon" href={common.favicon.data.attributes.url} />

				{/* ogp */}
				<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={about.ogp_img.data.attributes.url} />
				<meta property="og:title" content={about.title} />
				<meta property="og:description" content={about.description} />
				<meta name="twitter:card" content="summary" />

				<title>{about.title}</title>
				<meta name="description" content={about.description} />
			</Head>
			<Header logo={common.header_logo.data.attributes.url} />
			<main className="p-4">
				<div className="h-20"></div>
				<AboutSection contents={about} />
			</main>
			<Footer logo={common.logo_white.data.attributes.url} copyRight={common.copy_right} snsLinks={about.links} />
		</>
	);
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
	const commonRes: CommonRes = await fetchAPI('common', { populate: '*' });
	const aboutRes: AboutPageRes = await fetchAPI('about-page', {
		populate: { links: { populate: '*' }, profile_img: { populate: '*' }, ogp_img: { populate: '*' } },
	});

	const common: Common = commonRes.data.attributes;
	const about: AboutPage = aboutRes.data.attributes;
	return {
		props: {
			common,
			about,
		},
	};
};
