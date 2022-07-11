import { PostsNode } from "types/topWordpressRes";

type Props = {
  worksPosts: PostsNode[];
};

const Works = ({ worksPosts }: Props) => {
  return (
    <div>
      {worksPosts.map((value) => {
        return (
          <div className="h-24" key={value.id}>
            {value.title}
          </div>
        );
      })}
    </div>
  );
};

export default Works;
