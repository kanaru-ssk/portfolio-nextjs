import parse, { HTMLReactParserOptions } from "html-react-parser";

type Props = {
  source: string;
  options?: HTMLReactParserOptions;
};

const Content = ({ source, options }: Props) => {
  return <article>{parse(source, options)}</article>;
};

export default Content;
