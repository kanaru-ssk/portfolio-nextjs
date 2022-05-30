import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
const EditorJSHtml = require('editorjs-html');

// lib
import { fetchAPI } from 'libs/api';
import { CommonRes, Common } from 'types/common';
import { AboutPageRes, AboutPage } from 'types/aboutPage';
import { ProductsRes, Products, Product } from 'types/products';

// components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

export const config = { amp: true };

type Props = {
	common: Common;
	about: AboutPage;
	product: Product;
};

const WorksArticle: NextPage<Props> = ({ common, about, product }: Props) => {
	const contents: string[] = EditorJSHtml().parse(JSON.parse(product.contents));
	return (
		<>
			<Head>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN + '/works'} />
				<link rel="icon" href={common.favicon.data.attributes.url} />

				{/* ogp */}
				<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={product.basic_seo.ogp_img.data.attributes.url} />
				<meta property="og:title" content={product.basic_seo.title} />
				<meta property="og:description" content={product.basic_seo.description} />
				<meta name="twitter:card" content="summary" />

				<title>{product.basic_seo.title}</title>
				<meta name="description" content={product.basic_seo.description} />
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

export default WorksArticle;

export const getStaticPaths = async () => {
	const productsRes: ProductsRes = await fetchAPI('products', {
		populate: { basic_seo: { populate: '*' } },
	});
	const paths = productsRes.data.map((products: Products) => `/products/${products.attributes.path}`);
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const commonRes: CommonRes = await fetchAPI('common', { populate: '*' });
	const aboutRes: AboutPageRes = await fetchAPI('about-page', {
		populate: {
			profile_img: { populate: '*' },
			basic_seo: { populate: '*' },
			sns: { populate: { sns: { populate: '*' } } },
			biography: { populate: '*' },
		},
	});
	const productsRes: ProductsRes = await fetchAPI('products', {
		filter: { path: params!.id },
		populate: { basic_seo: { populate: '*' } },
	});

	const common: Common = commonRes.data.attributes;
	const about: AboutPage = aboutRes.data.attributes;
	const product: Product = productsRes.data[0].attributes;
	return {
		props: {
			common,
			about,
			product,
		},
	};
};
