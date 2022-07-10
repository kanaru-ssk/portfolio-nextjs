import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

// lib
import { fetchAPI } from 'libs/strapi';
import { CommonRes, Common } from 'types/common';
import { TopPageRes, TopPage } from 'types/topPage';
import { AboutPageRes, AboutPage } from 'types/aboutPage';
import { WorksRes } from 'types/works';
import { ProductsRes } from 'types/products';

// components
import Footer from 'components/common/Footer';
import ContactButton from 'components/common/ContactButton';
import FirstView from 'components/top/FirstView';
import AboutSection from 'components/top/AboutSection';
import ProductsSection from 'components/top/ProductsSection';

export const config = { amp: true };

type Props = {
	common: Common;
	top: TopPage;
	about: AboutPage;
	productsRes: ProductsRes;
	worksRes: WorksRes;
};

const Home: NextPage<Props> = ({ common, top, about, productsRes, worksRes }: Props) => {
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

			<main className="p-4">
				<FirstView catchCopy={top.catch_copy} />
				<AboutSection
					profileImg={about.profile_img.data.attributes.url}
					name={about.name}
					nameKana={about.name_kana}
					job={about.job}
					profileText={about.profile_text}
				/>

				<ProductsSection productsRes={productsRes} />

				<h2>works</h2>
				<div>
					{worksRes.data.map((value) => {
						return (
							<div key={value.id}>
								<amp-img
									src={value.attributes.eye_catch.data.attributes.url}
									width="400"
									height="210"
									alt="works"
								/>
								<div>{value.attributes.heading}</div>
							</div>
						);
					})}
				</div>

				<div className="py-8">
					<ContactButton />
				</div>
			</main>

			<Footer copyRight={common.copy_right} snsLinks={about.sns} productsRes={productsRes} worksRes={worksRes} />
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
	const productsRes: ProductsRes = await fetchAPI('products', {
		populate: { basic_seo: { populate: '*' }, eye_catch: { populate: '*' } },
	});
	const worksRes: WorksRes = await fetchAPI('works', {
		populate: { basic_seo: { populate: '*' }, eye_catch: { populate: '*' } },
	});

	const common: Common = commonRes.data.attributes;
	const top: TopPage = topRes.data.attributes;
	const about: AboutPage = aboutRes.data.attributes;
	return {
		props: {
			common,
			top,
			about,
			productsRes,
			worksRes,
		},
	};
};
