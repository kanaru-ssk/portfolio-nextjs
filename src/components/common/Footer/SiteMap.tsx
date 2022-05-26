import MenuLink from './MenuLink';
import PageLink from './PageLink';

const SiteMap = () => {
	return (
		<div className="flex flex-wrap gap-8 justify-center px-4 py-8">
			<div className="w-36">
				<MenuLink path="about" />
			</div>
			<div className="w-36">
				<MenuLink path="products" />
				<ul className="py-2">
					<PageLink title="ホームページ制作" path="products/home-page" />
					<PageLink title="webアプリ開発" path="products/web-app" />
				</ul>
			</div>
			<div className="w-36">
				<MenuLink path="works" />
				<ul className="py-2">
					<PageLink title="当サイト" path="works/kanaru-hp" />
					<PageLink title="行きたいとこリスト" path="works/go-list" />
				</ul>
			</div>
			<div className="w-36">
				<MenuLink path="contact" />
			</div>
		</div>
	);
};

export default SiteMap;
