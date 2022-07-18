import { PostNode } from "./wpTop";

export interface WpAllPostsRes {
  posts: Posts;
}

export interface Posts {
  nodes: PostNode[];
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
