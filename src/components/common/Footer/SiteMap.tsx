import Link from 'next/link';

const SiteMap = () => {
	return (
		<div className="flex justify-between px-4 py-8 font-medium">
			<div>
				<Link href="/about">
					<a>about</a>
				</Link>
			</div>
			<div>
				<Link href="/products">
					<a>products</a>
				</Link>
			</div>
			<div>
				<Link href="/works">
					<a>works</a>
				</Link>
			</div>
			<div>
				<Link href="/contact">
					<a>contact</a>
				</Link>
			</div>
		</div>
	);
};

export default SiteMap;
