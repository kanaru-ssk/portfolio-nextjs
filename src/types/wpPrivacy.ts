export interface WpPrivacyRes {
  privacy: Privacy;
}

export interface Privacy {
  id: string;
  content: string;
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
