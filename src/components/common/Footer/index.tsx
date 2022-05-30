import { Sn } from 'types/aboutPage';

import Logo from './Logo';
import SiteMap from './SiteMap';
import OfficialSns from './OfficialSns';
import Copy from './Copy';

type Props = {
	logo: string;
	copyRight: string;
	snsLinks: Sn[];
};

const Footer = ({ logo, copyRight, snsLinks }: Props) => {
	return (
		<footer className="w-full bg-black text-white">
			<Logo logo={logo} />
			<SiteMap />
			<OfficialSns snsLinks={snsLinks} />
			<Copy copyRight={copyRight} />
		</footer>
	);
};

export default Footer;
