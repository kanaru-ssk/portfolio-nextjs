export interface WpPostPathsRes {
  posts: Paths;
}

export interface Paths {
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
