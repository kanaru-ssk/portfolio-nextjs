type Props = {
  copyRight: string;
};

const Copy = ({ copyRight }: Props) => {
  return <div className="text-center">&copy; {copyRight}</div>;
};

export default Copy;
