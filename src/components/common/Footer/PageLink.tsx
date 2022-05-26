import Link from 'next/link';

type Props = {
	title: string;
	path: string;
};

const PageLink = ({ title, path }: Props) => {
	return (
		<li>
			<Link href={'/' + path}>
				<a className="font-medium">{title}</a>
			</Link>
		</li>
	);
};

export default PageLink;
