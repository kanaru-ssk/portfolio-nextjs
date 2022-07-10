import { Job, Skills, Link } from 'types/aboutPage';

import A from 'components/common/A';

type Props = {
	date: string;
	title: string;
	jobs: Job[];
	skills: Skills;
	links?: Link[];
	note: string;
};

const Biography = ({ date, title, jobs, skills, links, note }: Props) => {
	const langs = skills.data.filter((value) => {
		return value.attributes.category === 'lang';
	});
	const tools = skills.data.filter((value) => {
		return value.attributes.category === 'tool';
	});
	return (
		<div className="py-4 border-y border-gray">
			<div>{date}</div>
			<div className="pl-8">
				<h3 className="font-bold pb-2">{title}</h3>
				<div className="py-1">
					<div>担当 :</div>
					<ul>
						{jobs.map((value) => {
							return (
								<li className="pl-5" key={value.id}>
									- {value.name}
								</li>
							);
						})}
					</ul>
				</div>

				<div className="py-1">
					<div>使用言語など :</div>
					<ul>
						{langs.map((value) => {
							return (
								<li className="inline-block pl-5" key={value.id}>
									{value.attributes.name}
								</li>
							);
						})}
					</ul>
				</div>

				<div className="py-1">
					<div>使用ツールなど :</div>
					<ul>
						{tools.map((value) => {
							return (
								<li className="inline-block pl-5" key={value.id}>
									{value.attributes.name}
								</li>
							);
						})}
					</ul>
				</div>

				{links && (
					<div className="py-1">
						<div>関連リンク</div>
						<ul>
							{links.map((value) => {
								return (
									<li className="pl-5" key={value.id}>
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

export default Biography;
