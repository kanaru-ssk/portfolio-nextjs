type Props = {
  text: string;
};

const SendSuccess = ({ text }: Props) => {
  return <p className="whitespace-pre-wrap">{text}</p>;
};

export default SendSuccess;
