import Text from 'components/common/Text';

type Props = {
	text: string;
};

const SendSuccess = ({ text }: Props) => {
	return (
		<div>
			<Text text={text} />
		</div>
	);
};

export default SendSuccess;
