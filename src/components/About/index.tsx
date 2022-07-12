import Content from "components/common/Content";

type Props = {
  aboutContent: string;
};

const About = ({ aboutContent }: Props) => {
  return <Content source={aboutContent} />;
};

export default About;
