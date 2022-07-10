type Props = {
  copyRight: string;
};

const Copy = ({ copyRight }: Props) => {
  return <div className="text-center py-8">&copy; {copyRight}</div>;
};

export default Copy;
