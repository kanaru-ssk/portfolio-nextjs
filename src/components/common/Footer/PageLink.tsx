import Link from "next/link";

type Props = {
  title: string;
  path: string;
};

const PageLink = ({ title, path }: Props) => {
  return (
    <li className="font-medium text-gray py-2">
      <Link href={"/" + path}>
        <a>{title}</a>
      </Link>
    </li>
  );
};

export default PageLink;
