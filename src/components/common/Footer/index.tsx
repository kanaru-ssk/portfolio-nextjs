import Logo from './Logo';
import SiteMap from './SiteMap';
import OfficialSns from './OfficialSns';
import Copy from './Copy';

const Footer = () => {
	return (
		<footer className="w-full bg-black text-white">
			<Logo />
			<SiteMap />
			<OfficialSns />
			<Copy />
		</footer>
	);
};

export default Footer;
