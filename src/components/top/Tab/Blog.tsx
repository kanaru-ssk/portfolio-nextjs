import Image from "next/image";
import Link from "next/link";

import { PostsNode } from "types/wpTop";

type Props = {
  blogPosts: PostsNode[];
};

const Blog = ({ blogPosts }: Props) => {
  return (
    <ul>
      {blogPosts.map((value) => {
        return (
          <Link href={"/blog/" + value.slug} key={value.id} prefetch={false}>
            <a>
              <li className="flex h-24 px-4 py-3 sm:hover:bg-light-gray">
                <div className="h-[72px] w-32 min-w-fit">
                  <Image
                    src={
                      value.featuredImage?.node.sourceUrl
                        ? value.featuredImage.node.sourceUrl
                        : "/img/ogp.webp"
                    }
                    width="128"
                    height="72"
                    alt="blog"
                  />
                </div>

                <div className="relative flex-auto pl-4">
                  <div className="leading-5 line-clamp-2">{value.title}</div>
                  <div className="absolute bottom-0 right-0 text-xs">
                    {value.date.toString()}
                  </div>
                </div>
              </li>
            </a>
          </Link>
        );
      })}
    </ul>
  );
};

export default Blog;
