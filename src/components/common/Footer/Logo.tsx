import Link from 'next/link';

type Props = {
	logo: string;
};

const Logo = ({ logo }: Props) => {
	return (
		<div className="text-center py-16">
			<Link href="/">
				<a>
					<amp-img width="96" height="48" src={logo} alt="logo" />
				</a>
			</Link>
		</div>
	);
};

export default Logo;
