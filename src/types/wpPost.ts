export interface WpPostRes {
  postBy: Post;
}

export interface Post {
  seo: SEO;
  slug: string;
  content: string;
}

export interface SEO {
  description: string | null;
  title: string | null;
  ogpImg: OgpImg | null;
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
