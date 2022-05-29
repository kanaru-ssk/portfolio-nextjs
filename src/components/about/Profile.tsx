type Props = {
	profileImg: string;
	name: string;
	nameKana: string;
	job: string;
	profileText: string;
};

const Profile = ({ profileImg, name, nameKana, job, profileText }: Props) => {
	// \n -> <br />>
	const lbToBr = (txt: string): (string | JSX.Element)[] => {
		return txt.split(/(\n)/g).map((value, key) => (value === '\n' ? <br key={key} /> : value));
	};

	return (
		<>
			<div className="flex items-center gap-8 py-4">
				<amp-img className="rounded-full" src={profileImg} width="128" height="128" alt="profile" />
				<div>
					<div>{job}</div>
					<div className="text-xl">{name}</div>
					<div>{nameKana}</div>
				</div>
			</div>
			<p className="py-4">{lbToBr(profileText)}</p>
		</>
	);
};

export default Profile;
