import Logo from './Logo';
import SiteMap from './SiteMap';
import Copy from './Copy';

const Footer = () => {
	return (
		<footer className="w-full bg-black text-white">
			<Logo />
			<SiteMap />
			<Copy />
		</footer>
	);
};

export default Footer;
