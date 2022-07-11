import { PostsNode, PagesNode } from "types/topWordpressRes";

type Props = {
  aboutContent: string;
};

const About = ({ aboutContent }: Props) => {
  return <div dangerouslySetInnerHTML={{ __html: aboutContent }}></div>;
};

export default About;
