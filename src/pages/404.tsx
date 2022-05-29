import type { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';

// lib
import { fetchAPI } from 'libs/api';
import { CommonRes, Common } from 'types/common';
import { AboutPageRes, AboutPage } from 'types/aboutPage';

// components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

export const config = { amp: true };

type Props = {
	common: Common;
	about: AboutPage;
};

const Custom404: NextPage<Props> = ({ common, about }: Props) => {
	return (
		<>
			<Header logo={common.header_logo.data.attributes.url} />
			<main className="p-4">
				<div className="h-20"></div>
				<h1>404 Not Found</h1>
				<p>申し訳ございません。お探しのページは見つかりませんでした。</p>
				<div className="py-8">
					<Link href="/">
						<a className="text-blue underline">トップページに戻る</a>
					</Link>
				</div>
			</main>
			<Footer logo={common.logo_white.data.attributes.url} copyRight={common.copy_right} snsLinks={about.links} />
		</>
	);
};

export default Custom404;

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
