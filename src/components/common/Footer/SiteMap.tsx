import MenuLink from './MenuLink';
import PageLink from './PageLink';

const SiteMap = () => {
	return (
		<div className="flex justify-between px-4 py-8">
			<div>
				<MenuLink path="about" />
			</div>
			<div>
				<MenuLink path="products" />
				<ul>
					<PageLink title="ホームページ制作" path="products/home-page" />
					<PageLink title="webアプリ開発" path="products/web-app" />
				</ul>
			</div>
			<div>
				<MenuLink path="works" />
				<ul>
					<PageLink title="当サイト" path="works/kanaru-hp" />
					<PageLink title="行きたいとこリスト" path="works/go-list" />
				</ul>
			</div>
			<div>
				<MenuLink path="contact" />
			</div>
		</div>
	);
};

export default SiteMap;
