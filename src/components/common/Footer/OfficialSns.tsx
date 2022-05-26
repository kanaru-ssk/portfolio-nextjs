import Link from 'next/link';

import SnsLink from './SnsLink';

const OfficialSns = () => {
	return (
		<ul className="flex justify-left items-center list-none p-4">
			<li className="p-2 text-base">official SNS :</li>
			<SnsLink iconUrl="/twitter.svg" profileUrl="https://twitter.com/kanaru_dev" />
			<SnsLink iconUrl="/github.svg" profileUrl="https://github.com/kanaru-ssk" />
			<SnsLink iconUrl="/facebook.svg" profileUrl="https://www.facebook.com/profile.php?id=100074385632441" />
			<SnsLink iconUrl="/instagram.svg" profileUrl="https://instagram.com/kanaru_ssk" />
		</ul>
	);
};

export default OfficialSns;
