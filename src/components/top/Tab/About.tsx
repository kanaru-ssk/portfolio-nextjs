import Content from "components/common/Content";

type Props = {
  html: string;
};

const About = ({ html }: Props) => {
  return (
    <div className="p-4">
      <Content html={html} />
    </div>
  );
};

export default About;
