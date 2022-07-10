type Props = {
  copyRight: string;
};

const Copy = ({ copyRight }: Props) => {
  return <div className="py-8 text-center">&copy; {copyRight}</div>;
};

export default Copy;
