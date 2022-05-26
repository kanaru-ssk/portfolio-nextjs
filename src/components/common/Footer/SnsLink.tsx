import Link from 'next/link';

type Props = {
	iconUrl: string;
	profileUrl: string;
};
const SnsLink = ({ iconUrl, profileUrl }: Props) => {
	return (
		<li className="p-2 text-base">
			<Link href={profileUrl}>
				<a>
					<amp-img src={iconUrl} width="32" height="20" alt="" />
				</a>
			</Link>
		</li>
	);
};

export default SnsLink;
