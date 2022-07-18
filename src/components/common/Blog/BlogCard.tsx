import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  date: Date;
  sourceUrl: string;
};

const BlogCard = ({ slug, sourceUrl, title, date }: Props) => {
  return (
    <Link href={"/blog/" + slug} prefetch={false}>
      <a>
        <li className="flex h-24 px-4 py-3 sm:hover:bg-light-gray">
          <div className="h-[72px] w-32 min-w-fit">
            <Image src={sourceUrl} width="128" height="72" alt="blog" />
          </div>

          <div className="relative flex-auto pl-4">
            <div className="leading-5 line-clamp-2">{title}</div>
            <div className="absolute bottom-0 right-0 text-xs">
              {date.toString()}
            </div>
          </div>
        </li>
      </a>
    </Link>
  );
};

export default BlogCard;
