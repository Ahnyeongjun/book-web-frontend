export type Book = {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
};

type Meta = {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
};

export type KaKaoBookResponse = {
  documents: Book[];
  meta: Meta;
};

export type CSVBook = {
  SEQ_NO: string;
  ISBN_THIRTEEN_NO: string;
  VLM_NM: string;
  TITLE_NM: string;
  AUTHR_NM: string;
  PUBLISHER_NM: string;
  PBLICTE_DE: string;
  ADTION_SMBL_NM: string;
  PRC_VALUE: string;
  IMAGE_URL: string;
  BOOK_INTRCN_CN: string;
  KDC_NM: string;
  TITLE_SBST_NM: string;
  AUTHR_SBST_NM: string;
  TWO_PBLICTE_DE: string;
  INTNT_BOOKST_BOOK_EXST_AT: string;
  PORTAL_SITE_BOOK_EXST_AT: string;
  ISBN_NO: string;
};
