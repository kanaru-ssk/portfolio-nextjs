import Link from 'next/link';

type Props = {
	path: string;
};

const MenuLink = ({ path }: Props) => {
	return (
		<Link href={'/' + path}>
			<a className="font-medium text-base">{path}</a>
		</Link>
	);
};

export default MenuLink;
