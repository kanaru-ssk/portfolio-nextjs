import Menu from './Menu';
import Link from 'next/link';

const Header = () => {
	return (
		<header className="fixed flex justify-between items-center w-full h-20 px-4 bg-white">
			<Link href="/">
				<a>
					<amp-img width="64" height="32" src="/logo.svg" alt="logo" />
				</a>
			</Link>

			<Menu />
		</header>
	);
};

export default Header;
