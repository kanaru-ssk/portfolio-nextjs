import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
const EditorJSHtml = require('editorjs-html');

// lib
import { fetchAPI } from 'libs/api';
import { CommonRes, Common } from 'types/common';
import { AboutPageRes, AboutPage } from 'types/aboutPage';
import { ContactPageRes, ContactPage } from 'types/contactPage';

// components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

export const config = { amp: true };

type Props = {
	common: Common;
	about: AboutPage;
	contact: ContactPage;
};

const Contact: NextPage<Props> = ({ common, about, contact }: Props) => {
	const contents: string[] = EditorJSHtml().parse(JSON.parse(contact.contents));
	return (
		<>
			<Head>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_DOMAIN + '/contact'} />
				<link rel="icon" href={common.favicon.data.attributes.url} />

				{/* ogp */}
				<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={contact.ogp_img.data.attributes.url} />
				<meta property="og:title" content={contact.title} />
				<meta property="og:description" content={contact.description} />
				<meta name="twitter:card" content="summary" />

				<title>{contact.title}</title>
				<meta name="description" content={contact.description} />
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

export default Contact;

export const getStaticProps: GetStaticProps = async () => {
	const commonRes: CommonRes = await fetchAPI('common', { populate: '*' });
	const aboutRes: AboutPageRes = await fetchAPI('about-page', {
		populate: { links: { populate: '*' }, profile_img: { populate: '*' }, ogp_img: { populate: '*' } },
	});
	const contactRes: ContactPageRes = await fetchAPI('contact-page', { populate: '*' });

	const common: Common = commonRes.data.attributes;
	const about: AboutPage = aboutRes.data.attributes;
	const contact: ContactPage = contactRes.data.attributes;
	return {
		props: {
			common,
			about,
			contact,
		},
	};
};
