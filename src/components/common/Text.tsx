type Props = {
	text: string;
};

const Text = ({ text }: Props) => {
	return <div>{text.split(/(\n)/g).map((value, key) => (value === '\n' ? <br key={key} /> : value))}</div>;
};

export default Text;
