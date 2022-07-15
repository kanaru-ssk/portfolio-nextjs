export interface WpPostPathsRes {
  posts: Posts;
}

export interface Posts {
  nodes: Node[];
}

export interface Node {
  id: string;
  slug: string;
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
