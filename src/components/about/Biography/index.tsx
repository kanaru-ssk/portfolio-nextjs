import { Biography } from 'types/aboutPage';

import OneBio from './OneBio';

type Props = {
	bio: Biography[];
};

const Biography = ({ bio }: Props) => {
	return (
		<div>
			{bio.map((value) => {
				return (
					<OneBio
						date={value.time}
						title={value.title}
						jobs={value.jobs}
						skills={value.skills}
						links={value.links}
						note={value.note}
						key={value.id}
					/>
				);
			})}
		</div>
	);
};

export default Biography;
