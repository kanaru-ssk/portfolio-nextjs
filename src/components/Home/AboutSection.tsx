const AboutSection = () => {
	// \n -> <br />>
	const lbToBr = (txt: string) => {
		return txt.split(/(\n)/g).map((t) => (t === '\n' ? <br /> : t));
	};

	return (
		<div>
			<h1 className="py-4">about</h1>
			<div className="flex items-center gap-8 py-4">
				<amp-img className="rounded-full" src="favicon.svg" width="128" height="128" alt="profile" />
				<div>
					<div>webエンジニア</div>
					<div className="text-xl">佐々木哉瑠</div>
					<div>Sasaki Kanaru</div>
				</div>
			</div>
			<p className="py-4">
				{lbToBr(
					'仙台で活動するwebエンジニアです。\n個人でwebアプリの開発をしたり、フリーランスとしてホームページの制作や、企業様の開発案件に参画させて頂いたりしています。',
				)}
			</p>
		</div>
	);
};

export default AboutSection;
