import Text from "components/common/Text";

type Props = {
  text: string;
};

const SendSuccess = ({ text }: Props) => {
  return (
    <p>
      <Text text={text} />
    </p>
  );
};

export default SendSuccess;
