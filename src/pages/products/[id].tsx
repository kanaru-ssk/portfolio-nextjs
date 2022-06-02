import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

// lib
import { fetchAPI } from 'libs/strapi';
import { CommonRes, Common } from 'types/common';
import { AboutPageRes, AboutPage } from 'types/aboutPage';
import { ProductsRes, Products, Product } from 'types/products';
import { WorksRes } from 'types/works';

// components
import Footer from 'components/common/Footer';

export const config = { amp: true };

type Props = {
	common: Common;
	about: AboutPage;
	product: Product;
	productsRes: ProductsRes;
	worksRes: WorksRes;
};

const WorksArticle: NextPage<Props> = ({ common, about, product, productsRes, worksRes }: Props) => {
	const EditorJSHtml = require('editorjs-html');
	const contents: string[] = EditorJSHtml().parse(JSON.parse(product.contents));
	return (
		<>
			<Head>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN + '/works'} />
				<link rel="icon" href={common.favicon.data.attributes.url} />

				<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={product.basic_seo.ogp_img.data.attributes.url} />
				<meta property="og:title" content={product.basic_seo.title} />
				<meta property="og:description" content={product.basic_seo.description} />
				<meta name="twitter:card" content="summary" />

				<title>{product.basic_seo.title}</title>
				<meta name="description" content={product.basic_seo.description} />
			</Head>

			<main className="p-4">
				<div className="h-20"></div>

				{contents.map((value, key) => {
					return <div key={key} dangerouslySetInnerHTML={{ __html: value }}></div>;
				})}
			</main>
			<Footer copyRight={common.copy_right} snsLinks={about.sns} productsRes={productsRes} worksRes={worksRes} />
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
	const worksRes: WorksRes = await fetchAPI('works');

	const common: Common = commonRes.data.attributes;
	const about: AboutPage = aboutRes.data.attributes;
	const product: Product = productsRes.data[0].attributes;
	return {
		props: {
			common,
			about,
			product,
			productsRes,
			worksRes,
		},
	};
};
