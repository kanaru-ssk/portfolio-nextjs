import { Sn } from 'types/aboutPage';
import { WorksRes } from 'types/works';
import { ProductsRes } from 'types/products';

import Logo from './Logo';
import SiteMap from './SiteMap';
import OfficialSns from './OfficialSns';
import Copy from './Copy';

type Props = {
	logo: string;
	copyRight: string;
	snsLinks: Sn[];
	productsRes: ProductsRes;
	worksRes: WorksRes;
};

const Footer = ({ logo, copyRight, snsLinks, productsRes, worksRes }: Props) => {
	return (
		<footer className="w-full bg-black text-white">
			<Logo logo={logo} />
			<SiteMap productsRes={productsRes} worksRes={worksRes} />
			<OfficialSns snsLinks={snsLinks} />
			<Copy copyRight={copyRight} />
		</footer>
	);
};

export default Footer;
