type Props = {
	catchCopy: string;
};

const FirstView = ({ catchCopy }: Props) => {
	const split = catchCopy.split('\n');
	return (
		<div>
			{split.map((key, value) => {
				return <div key={key}>{split[value]}</div>;
			})}
		</div>
	);
};

export default FirstView;
