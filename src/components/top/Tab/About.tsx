type Props = {
  html: string;
};

const About = ({ html }: Props) => {
  return (
    <div className="p-4">
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default About;
