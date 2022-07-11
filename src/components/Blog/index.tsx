import { PostsNode } from "types/topWordpressRes";

type Props = {
  blogPosts: PostsNode[];
};

const Blog = ({ blogPosts }: Props) => {
  return (
    <div>
      {blogPosts.map((value) => {
        return (
          <div className="h-24" key={value.id}>
            {value.title}
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
