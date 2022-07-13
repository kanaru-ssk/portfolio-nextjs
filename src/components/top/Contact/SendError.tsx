type Props = {
  text: string;
};

const SendError = ({ text }: Props) => {
  return <p className="whitespace-pre-wrap text-red">{text} </p>;
};

export default SendError;
