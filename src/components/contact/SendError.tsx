import Text from 'components/common/Text';

type Props = {
	text: string;
};

const SendError = ({ text }: Props) => {
	return (
		<div className="text-red">
			<Text text={text} />
		</div>
	);
};

export default SendError;
