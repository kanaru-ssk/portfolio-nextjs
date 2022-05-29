import Link from 'next/link';

type Props = {
	url: string;
};

const MoreButton = ({ url }: Props) => {
	return (
		<div className="text-center py-2">
			<Link href="/about">
				<a>
					<div className="inline-block rounded-full border border-solid border-black px-4 py-1 hover:bg-black hover:text-white">
						show more
					</div>
				</a>
			</Link>
		</div>
	);
};

export default MoreButton;
