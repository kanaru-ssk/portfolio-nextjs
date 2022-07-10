import Link from "next/link";

type Props = {
  title: string;
  path: string;
};

const PageLink = ({ title, path }: Props) => {
  return (
    <li className="py-2 font-medium text-gray">
      <Link href={"/" + path}>
        <a>{title}</a>
      </Link>
    </li>
  );
};

export default PageLink;
