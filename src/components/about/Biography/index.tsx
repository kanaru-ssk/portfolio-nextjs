import OneBio from './OneBio';

const Biography = () => {
	return (
		<div>
			<OneBio date="2022/05 ~" title="フリーランスのwebエンジニアとして活動" jobs={['フロントエンド開発']} />
			<OneBio
				date="2022/05"
				title="【個人開発自分のホームページ制作】"
				jobs={['設計', 'デザイン', 'サーバー、ドメインなど環境構築', 'コーディング', '運用']}
			/>
			{/* <h3>2022/05 ~</h3>
			<div >フリーランスのwebエンジニアとして活動開始</div>
			<h3>2022/05</h3>
			<div>個人開発 : ホームページ制作</div>
			<h3>2022/01</h3>
			<div>個人開発 : webアプリ「行きたいとこリスト開発」</div> */}
		</div>
	);
};

export default Biography;
