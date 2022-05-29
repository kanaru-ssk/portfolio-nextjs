type Props = {
	date: string;
	title: string;
	jobs: string[];
};

const OneBio = ({ date, title, jobs }: Props) => {
	return (
		<div className="py-4">
			<div>{date}</div>
			<div className="pl-3">
				<div className="font-bold pb-2">{title}</div>
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
		</div>
	);
};

export default OneBio;
