export interface WpPostRes {
  postBy: Post;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: Date;
  content: string;
  seo: SEO;
}

export interface SEO {
  description: string;
  title: string;
  ogpImg: OgpImg;
}

export interface OgpImg {
  sourceUrl: string;
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
