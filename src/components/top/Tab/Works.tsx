import Image from "next/image";
import Link from "next/link";

import { PostsNode } from "types/wpTop";

type Props = {
  worksPosts: PostsNode[];
};

const Works = ({ worksPosts }: Props) => {
  return (
    <ul className="flex flex-wrap justify-between">
      {worksPosts.map((value) => {
        return (
          <li className="h-[50vw] w-1/2" key={value.id}>
            <Link href={"/works/" + value.slug} key={value.id}>
              <a>
                <div className="relative h-full w-full">
                  <Image
                    src={
                      value.featuredImage?.node.sourceUrl
                        ? value.featuredImage.node.sourceUrl
                        : "/img/ogp.png"
                    }
                    width="384"
                    height="384"
                    alt="profile"
                  />
                  <div className="absolute bottom-0 h-8 w-full bg-trans-white text-center leading-8">
                    {value.title}
                  </div>
                </div>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Works;