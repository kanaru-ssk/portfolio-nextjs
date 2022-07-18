export interface WpTopRes {
  generalSettings: GeneralSettings;
  blog: Post;
  works: Post;
  pageBy: AboutPage;
  categories: DataCategories;
}

export interface Post {
  nodes: PostNode[];
}

export interface PostNode {
  id: string;
  title: string;
  date: Date;
  slug: string;
  featuredImage: FeaturedImage | null;
  categories: NodeCategories;
}

export interface NodeCategories {
  nodes: PurpleNode[];
}

export interface PurpleNode {
  id: string;
  name: Name;
}

type Name = "blog" | "works";

export interface FeaturedImage {
  node: ProfileImg;
}

export interface ProfileImg {
  id: string;
  sourceUrl: string;
}

export interface DataCategories {
  nodes: FluffyNode[];
}

export interface FluffyNode {
  id: string;
  count: number | null;
  name: string;
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

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
