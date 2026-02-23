export type FormattedPublisher = {
  PublisherName: string;
  InstagramID: string;
  LogoLink: string;
  URL: string;
  URLType: string;
  BookISBN: string;
  Memo: string;
  Tag: string;
  id: number;
};

export type FormattedContents = {
  contentTitle: string;
  BookName: string;
  URL: string[];
  Memo: string;
  Tag: string;
  id: number;
};
