import Text from "components/common/Text";

type Props = {
  catchCopy: string;
};

const FirstView = ({ catchCopy }: Props) => {
  return (
    <div className="flex flex-col justify-center h-screen">
      <Text text={catchCopy} />
    </div>
  );
};

export default FirstView;
