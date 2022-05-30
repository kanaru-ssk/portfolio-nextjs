import { Sn } from 'types/aboutPage';

import SnsLink from './SnsLink';

type Props = {
	snsLinks: Sn[];
};

const OfficialSns = ({ snsLinks }: Props) => {
	return (
		<ul className="flex justify-left items-center list-none p-4">
			<li className="p-2 text-base">official SNS :</li>

			{snsLinks.map((value) => {
				return (
					<SnsLink
						key={value.id}
						snsName={value.sns.data.attributes.name}
						iconUrl={value.sns.data.attributes.icon.data.attributes.url}
						profileUrl={value.url}
					/>
				);
			})}
		</ul>
	);
};

export default OfficialSns;
