import { AboutPage } from 'types/aboutPage';

type Props = {
	contents: AboutPage;
};

const AboutSection = ({ contents }: Props) => {
	// \n -> <br />>
	const lbToBr = (txt: string) => {
		return txt.split(/(\n)/g).map((value, key) => (value === '\n' ? <br key={key} /> : value));
	};

	return (
		<div>
			<h1 className="py-4">about</h1>
			<div className="flex items-center gap-8 py-4">
				<amp-img
					className="rounded-full"
					src={contents.profile_img.data.attributes.url}
					width="128"
					height="128"
					alt="profile"
				/>
				<div>
					<div>{contents.job}</div>
					<div className="text-xl">{contents.name}</div>
					<div>{contents.name_kana}</div>
				</div>
			</div>
			<p className="py-4">{lbToBr(contents.profile_text)}</p>
		</div>
	);
};

export default AboutSection;
