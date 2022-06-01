import Text from 'components/common/Text';

type Props = {
	text: string;
};

const SendError = ({ text }: Props) => {
	return (
		<div>
			<Text text={text} />
		</div>
	);
};

export default SendError;
