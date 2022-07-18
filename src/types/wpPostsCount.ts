export interface WpPostsCountRes {
  categories: Categories;
}

export interface Categories {
  nodes: Node[];
}

export interface Node {
  id: string;
  count: number | null;
  name: string;
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
