import Text from "components/common/Text";

type Props = {
  catchCopy: string;
};

const FirstView = ({ catchCopy }: Props) => {
  return (
    <div className="flex h-screen flex-col justify-center">
      <Text text={catchCopy} />
    </div>
  );
};

export default FirstView;
