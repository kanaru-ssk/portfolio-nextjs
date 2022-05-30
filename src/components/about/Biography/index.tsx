import OneBio from './OneBio';

const Biography = () => {
	return (
		<div>
			<OneBio
				date="2022/05 ~"
				title="フリーランスのwebエンジニアとして活動"
				jobs={['フロントエンド開発']}
				langs={['TypeScript', 'JavaScript', 'ReactJS', 'NextJS']}
				tools={['Git', 'GitHub', 'GitLab']}
				note="備考欄です。"
			/>

			<OneBio
				date="2022/05"
				title="【個人開発自分のホームページ制作】"
				jobs={['設計', 'デザイン', 'サーバー、ドメインなど環境構築', 'コーディング', '運用']}
				langs={['TypeScript', 'JavaScript', 'ReactJS', 'NextJS']}
				tools={['Git', 'GitHub', 'GitLab']}
				links={[{ title: 'GitHubリポジトリ', url: 'https://github.com/kanaru-ssk/portfolio-nextjs' }]}
				note="備考欄です。"
			/>
		</div>
	);
};

export default Biography;
