import { Link } from 'types/aboutPage';

import SnsLink from './SnsLink';

type Props = {
	snsLinks: Link[];
};

const OfficialSns = ({ snsLinks }: Props) => {
	return (
		<ul className="flex justify-left items-center list-none p-4">
			<li className="p-2 text-base">official SNS :</li>

			{snsLinks.map((value, key) => {
				return <SnsLink key={key} iconUrl={value.icon.data.attributes.url} profileUrl={value.url} />;
			})}
		</ul>
	);
};

export default OfficialSns;
