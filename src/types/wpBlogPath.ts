export interface WpBlogPathRes {
  posts: Posts;
}

export interface Posts {
  nodes: Node[];
}

export interface Node {
  slug: string;
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
