export interface WpTopRes {
  generalSettings: GeneralSettings;
  posts: Posts;
  pageBy: AboutPage;
}

export interface GeneralSettings {
  title: string;
  description: string;
}

export interface AboutPage {
  id: string;
  content: string;
  profile: Profile;
}

export interface Profile {
  bio: string;
  job: string;
  name: string;
  nameRoman: string;
  profileImg: ProfileImg;
}

export interface ProfileImg {
  id: string;
  sourceUrl: string;
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
  slug: string;
}

export interface Categories {
  nodes: CategoriesNode[];
}

export interface CategoriesNode {
  id: string;
  name: Name;
}

export type Name = "blog" | "works";

export interface FeaturedImage {
  node: ProfileImg;
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
