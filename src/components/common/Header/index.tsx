import Menu from './Menu';
import Link from 'next/link';

type Props = {
	logo: string;
};

const Header = ({ logo }: Props) => {
	return (
		<header className="z-10 fixed flex justify-between items-center w-full h-20 px-4 bg-white">
			<Link href="/">
				<a>
					<amp-img width="64" height="32" src={logo} alt="logo" />
				</a>
			</Link>

			<Menu />
		</header>
	);
};

export default Header;
