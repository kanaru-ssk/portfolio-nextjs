import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';

// lib
import { fetchAPI } from 'libs/strapi';
import { CommonRes, Common } from 'types/common';
import { AboutPageRes, AboutPage } from 'types/aboutPage';
import { ContactPageRes, ContactPage } from 'types/contactPage';
import { WorksRes } from 'types/works';
import { ProductsRes } from 'types/products';

// components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Form from 'components/contact/Form';
import SendSuccess from 'components/contact/SendSuccess';
import SendError from 'components/contact/SendError';

type Props = {
	common: Common;
	about: AboutPage;
	contact: ContactPage;
	productsRes: ProductsRes;
	worksRes: WorksRes;
};

type ViewStatus = 'Form' | 'Success' | 'Error';

const Contact: NextPage<Props> = ({ common, about, contact, productsRes, worksRes }: Props) => {
	const [viewStatus, setViewStatus] = useState<ViewStatus>('Form');

	return (
		<>
			<Head>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN + '/contact'} />
				<link rel="icon" href={common.favicon.data.attributes.url} />

				<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={contact.basic_seo.ogp_img.data.attributes.url} />
				<meta property="og:title" content={contact.basic_seo.title} />
				<meta property="og:description" content={contact.basic_seo.description} />
				<meta name="twitter:card" content="summary" />

				<title>{contact.basic_seo.title}</title>
				<meta name="description" content={contact.basic_seo.description} />
			</Head>
			<Header />
			<main className="p-4">
				<div className="h-20"></div>

				<h1>contact</h1>

				{viewStatus === 'Form' && (
					<Form viewStatus={viewStatus} setViewStatus={setViewStatus} text={contact.form_text} />
				)}
				{viewStatus === 'Success' && <SendSuccess text={contact.success_text} />}
				{viewStatus === 'Error' && (
					<>
						<Form viewStatus={viewStatus} setViewStatus={setViewStatus} text={contact.form_text} />
						<SendError text={contact.error_text} />
					</>
				)}
			</main>
			<Footer copyRight={common.copy_right} snsLinks={about.sns} productsRes={productsRes} worksRes={worksRes} />
		</>
	);
};

export default Contact;

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
	const contactRes: ContactPageRes = await fetchAPI('contact-page', {
		populate: { basic_seo: { populate: '*' } },
	});
	const productsRes: ProductsRes = await fetchAPI('products');
	const worksRes: WorksRes = await fetchAPI('works');

	const common: Common = commonRes.data.attributes;
	const about: AboutPage = aboutRes.data.attributes;
	const contact: ContactPage = contactRes.data.attributes;
	return {
		props: {
			common,
			about,
			contact,
			productsRes,
			worksRes,
		},
	};
};
