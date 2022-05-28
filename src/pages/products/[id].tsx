import type { NextPage, GetStaticProps } from 'next';

import { fetchAPI } from 'libs/api';

export const config = { amp: true };

type Props = {
	articles: any;
};

const ProductsArticle: NextPage<Props> = ({ articles }: Props) => {
	console.log(articles);
	return (
		<>
			<div className="h-20"></div>
			<div className="p-4">{articles.contents}</div>
		</>
	);
};

export default ProductsArticle;

export const getStaticPaths = async () => {
	const res: any = await fetchAPI('products');
	const paths = res.data.map((article: any) => `/products/${article.id}`);
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const resArticles: any = await fetchAPI(`products/${params!.id}`);

	const articles = resArticles.data.attributes;
	return {
		props: {
			articles,
		},
	};
};
