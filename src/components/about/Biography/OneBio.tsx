import A from 'components/common/A';

type Props = {
	date: string;
	title: string;
	jobs: string[];
	langs: string[];
	tools: string[];
	links?: {
		title: string;
		url: string;
	}[];
	note: string;
};

const OneBio = ({ date, title, jobs, langs, tools, links, note }: Props) => {
	return (
		<div className="py-4 border-y border-gray">
			<div>{date}</div>
			<div className="pl-8">
				<h3 className="font-bold pb-2">{title}</h3>
				<div className="py-1">
					<div>担当 :</div>
					<ul>
						{jobs.map((value, key) => {
							return (
								<li className="pl-5" key={key}>
									- {value}
								</li>
							);
						})}
					</ul>
				</div>

				<div className="py-1">
					<div>使用言語など :</div>
					<ul>
						{langs.map((value, key) => {
							return (
								<li className="inline-block pl-5" key={key}>
									{value}
								</li>
							);
						})}
					</ul>
				</div>

				<div className="py-1">
					<div>使用ツールなど :</div>
					<ul>
						{tools.map((value, key) => {
							return (
								<li className="inline-block pl-5" key={key}>
									{value}
								</li>
							);
						})}
					</ul>
				</div>

				{links && (
					<div className="py-1">
						<div>関連リンク</div>
						<ul>
							{links.map((value, key) => {
								return (
									<li className="pl-5" key={key}>
										<A title={value.title} url={value.url} />
									</li>
								);
							})}
						</ul>
					</div>
				)}

				<div className="py-1">{note}</div>
			</div>
		</div>
	);
};

export default OneBio;
