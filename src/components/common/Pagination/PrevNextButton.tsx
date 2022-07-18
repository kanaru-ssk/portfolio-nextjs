import Link from "next/link";

type Props = {
  href: string;
  isShallow: boolean;
  children: string;
};

const PrevNextButton = ({ href, isShallow, children }: Props) => {
  return (
    <Link href={href} shallow={isShallow}>
      <a className="w-full">
        <div
          className={`${
            isShallow && "cursor-default text-gray"
          } w-full py-2 sm:hover:text-gray`}
        >
          {children}
        </div>
      </a>
    </Link>
  );
};

export default PrevNextButton;
