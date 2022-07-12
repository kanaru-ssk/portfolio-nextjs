import Text from "components/common/Text";

type Props = {
  text: string;
};

const SendError = ({ text }: Props) => {
  return (
    <p className="text-red">
      <Text text={text} />
    </p>
  );
};

export default SendError;
