// export interface TopWordpressRes {
//   data: Data;
//   extensions: Extensions;
// }

export interface TopWordpressRes {
  generalSettings: GeneralSettings;
  pages: Pages;
  posts: Posts;
}

export interface GeneralSettings {
  title: string;
  description: string;
}

export interface Pages {
  nodes: PagesNode[];
}

export interface PagesNode {
  title: string;
  content: string;
}

export interface Posts {
  nodes: PostsNode[];
}

export interface PostsNode {
  id: string;
  title: string;
  date: Date;
  featuredImage: FeaturedImage | null;
  categories: Categories;
}

export interface Categories {
  nodes: CategoriesNode[];
}

export interface CategoriesNode {
  name: Name;
}

export type Name = "blog" | "works";

export interface FeaturedImage {
  node: FeaturedImageNode;
}

export interface FeaturedImageNode {
  link: string;
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
