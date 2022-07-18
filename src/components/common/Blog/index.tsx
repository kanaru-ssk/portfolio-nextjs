import BlogCard from "./BlogCard";

import { PostNode } from "types/wpTop";

type Props = {
  blogPosts: PostNode[];
};

const Blog = ({ blogPosts }: Props) => {
  return (
    <div>
      <ul>
        {blogPosts.map((value) => {
          return (
            <BlogCard
              key={value.id}
              slug={value.slug}
              sourceUrl={
                value.featuredImage?.node.sourceUrl
                  ? value.featuredImage.node.sourceUrl
                  : "/img/404.webp"
              }
              title={value.title}
              date={value.date}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Blog;
