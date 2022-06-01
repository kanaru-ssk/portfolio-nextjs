type Props = {
	text: string;
};

const Text = ({ text }: Props) => {
	return <>{text.split(/(\n)/g).map((value, key) => (value === '\n' ? <br key={key} /> : value))}</>;
};

export default Text;
