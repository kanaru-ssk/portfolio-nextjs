import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

// lib
import { fetchAPI } from 'libs/strapi';
import { CommonRes, Common } from 'types/common';
import { AboutPageRes, AboutPage, Skills } from 'types/aboutPage';
import { WorksRes } from 'types/works';
import { ProductsRes } from 'types/products';

// components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import ContactButton from 'components/common/ContactButton';
import Profile from 'components/about/Profile';
import Biography from 'components/about/Biography';
import Skill from 'components/about/Skill';

export const config = { amp: true };

type Props = {
	common: Common;
	about: AboutPage;
	skills: Skills;
	productsRes: ProductsRes;
	worksRes: WorksRes;
};

const About: NextPage<Props> = ({ common, about, skills, productsRes, worksRes }: Props) => {
	return (
		<>
			<Head>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN + '/about'} />
				<link rel="icon" href={common.favicon.data.attributes.url} />

				<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={about.basic_seo.ogp_img.data.attributes.url} />
				<meta property="og:title" content={about.basic_seo.title} />
				<meta property="og:description" content={about.basic_seo.description} />
				<meta name="twitter:card" content="summary" />

				<title>{about.basic_seo.title}</title>
				<meta name="description" content={about.basic_seo.description} />
			</Head>
			<Header />
			<main className="p-4">
				<div className="h-20"></div>
				<div className="py-8">
					<h1>about</h1>
					<Profile
						profileImg={about.profile_img.data.attributes.url}
						name={about.name}
						nameKana={about.name_kana}
						job={about.job}
						profileText={about.profile_text}
					/>
				</div>

				<div className="py-8">
					<h2>biography</h2>
					{about.biography.map((value) => {
						return (
							<Biography
								date={value.time}
								title={value.title}
								jobs={value.jobs}
								skills={value.skills}
								links={value.links}
								note={value.note}
								key={value.id}
							/>
						);
					})}
				</div>

				<div className="py-8">
					<h2>skill</h2>
					<Skill skills={skills} />
				</div>

				<div className="py-8">
					<ContactButton />
				</div>
			</main>
			<Footer copyRight={common.copy_right} snsLinks={about.sns} productsRes={productsRes} worksRes={worksRes} />
		</>
	);
};

export default About;

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
	const skills: Skills = await fetchAPI('skills');
	const productsRes: ProductsRes = await fetchAPI('products');
	const worksRes: WorksRes = await fetchAPI('works');

	const common: Common = commonRes.data.attributes;
	const about: AboutPage = aboutRes.data.attributes;
	return {
		props: {
			common,
			about,
			skills,
			productsRes,
			worksRes,
		},
	};
};
