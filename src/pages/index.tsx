import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

// lib
import { fetchAPI } from 'libs/api';
import { CommonRes, Common } from 'types/common';
import { TopPageRes, TopPage } from 'types/topPage';
import { AboutPageRes, AboutPage } from 'types/aboutPage';

// components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import FirstView from 'components/top/FirstView';
import AboutSection from 'components/top/AboutSection';
import ProductsSection from 'components/top/ProductsSection';

export const config = { amp: true };

type Props = {
	common: Common;
	top: TopPage;
	about: AboutPage;
};

const Home: NextPage<Props> = ({ common, top, about }: Props) => {
	const schemaData = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: '佐々木哉瑠',
		url: process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN,
		logo: common.header_logo.data.attributes.url,
	};

	return (
		<>
			<Head>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN} />
				<link rel="icon" href={common.favicon.data.attributes.url} />

				<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={top.basic_seo.ogp_img.data.attributes.url} />
				<meta property="og:title" content={top.basic_seo.title} />
				<meta property="og:description" content={top.basic_seo.description} />
				<meta name="twitter:card" content="summary" />

				<title>{top.basic_seo.title}</title>
				<meta name="description" content={top.basic_seo.description} />

				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
			</Head>

			<Header logo={common.header_logo.data.attributes.url} />

			<main className="p-4">
				<FirstView catchCopy={top.catch_copy} />
				<AboutSection
					profileImg={about.profile_img.data.attributes.url}
					name={about.name}
					nameKana={about.name_kana}
					job={about.job}
					profileText={about.profile_text}
				/>
				<ProductsSection />
			</main>

			<Footer logo={common.logo_white.data.attributes.url} copyRight={common.copy_right} snsLinks={about.sns} />
		</>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	const commonRes: CommonRes = await fetchAPI('common', { populate: '*' });
	const topRes: TopPageRes = await fetchAPI('top-page', { populate: { basic_seo: { populate: '*' } } });
	const aboutRes: AboutPageRes = await fetchAPI('about-page', {
		populate: {
			profile_img: { populate: '*' },
			basic_seo: { populate: '*' },
			sns: { populate: { sns: { populate: '*' } } },
			biography: { populate: '*' },
		},
	});

	const common: Common = commonRes.data.attributes;
	const top: TopPage = topRes.data.attributes;
	const about: AboutPage = aboutRes.data.attributes;
	return {
		props: {
			common,
			top,
			about,
		},
	};
};
