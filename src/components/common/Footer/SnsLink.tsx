import Link from 'next/link';

type Props = {
	iconUrl: string;
	profileUrl: string;
};
const SnsLink = ({ iconUrl, profileUrl }: Props) => {
	return (
		<li className="p-2 text-base">
			<Link href={profileUrl}>
				<a title="SNSプロフィールへのリンク">
					<amp-img src={iconUrl} width="32" height="20" alt="sns-link" />
				</a>
			</Link>
		</li>
	);
};

export default SnsLink;
