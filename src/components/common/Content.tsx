type Props = {
  html: string;
};

const Content = ({ html }: Props) => {
  return <article dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Content;
