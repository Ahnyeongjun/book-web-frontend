/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
//npx swagger-typescript-api generate --path https://book-be-5lb9.onrender.com/api-docs -o ./types/dto.ts --no-client
//swagger-typescript-api로 생성됨
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PublisherCreateRequest {
  name: string;
  engName: string;
  logo?: string;
  urls?: UrlInfo[];
  userId?: number;
  bookIsbnList?: { value: number }[];
  /** @default [] */
  description?: string;
  memo?: string;
  /** @default [] */
  tagList?: string;
}

export interface PublisherPostRequest extends PublisherCreateRequest {
  bookIsbnList?: number[];
  tagList?: string[];
}

export interface PublisherDetail {
  id: number;
  name: string;
  engName: string;
  logo?: string;
  isOfficial: boolean;
  description?: string;
  urls?: UrlInfo[];
  books: BookDto[];
  tagList?: TagDto;
}

/** @default [] */
export interface UrlInfo {
  url: string;
  type: "Link" | "Youtube" | "Profile" | "Homepage" | "Blog";
}

export interface UrlInfoTypeString {
  url: string;
  type: string;
}

export interface BookDto {
  isbn: string;
  title: string;
  summary: string;
  publisher: Simple;
  /** @format date-time */
  publishedDate: string;
  authorList: Simple[];
  titleImage?: string;
  translator?: string;
  /** @format int32 */
  price?: number;
}

export interface Detail {
  /** @format int64 */
  isbn: string;
  title: string;
  detailUrl: string;
  summary: string;
  publishedDate: Date;
  titleImage: string;
  authorList: [];
  translator: [];
  price: number;
  status: string;
  publisher: {
    id: number;
    name: string;
  };
  contentsDtoList: [];
  eventDtoList: [];
}

export interface Simple {
  /** @format int64 */
  id: number;
  name: string;
}

export interface TagDto {
  name: string;
}

export interface EventCreateRequest {
  title: string;
  urls: UrlInfoTypeString[];
  host: string;
  /** @format int64 */
  userId: number;
  location: "ONLINE" | "OFFLINE";
  startDate: string;
  endDate: string;
  eventType: string;
  eventFlag: "SOLO" | "GROUP" | "ETC";
  isPosting: boolean;
  bookTitle?: string;
  senderName?: string;
  senderEmail?: string;
  senderMessage?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  memo?: string;
  /** @default [] */
  tagList?: string;
  /** @default [] */
  bookIsbnList?: { value: number }[];
}

export interface EventPostRequest extends EventCreateRequest {
  bookIsbnList?: number[];
  tagList?: string[];
}

export interface EventDto {
  /** @format int64 */
  id: number;
  title: string;
  host: string;
  creator: UserDto;
  urls: UrlInfo[];
  bookTitle?: string;
  senderName?: string;
  senderEmail?: string;
  senderMessage?: string;
  location: "ONLINE" | "OFFLINE";
  /** @format date */
  startDate: string;
  /** @format date */
  endDate: string;
  bookIsbnList?: { value: number }[];
  eventType: string;
  eventFlag: "SOLO" | "GROUP" | "ETC";
  memo?: string;
  books: BookDto[];
  tags: TagDto[];
}

export interface UserDto {
  /** @format int64 */
  id: number;
  name: string;
  bookIsbnList?: number[];
}

export interface ContentsCreateRequest {
  /** @format int64 */
  creatorId: number;
  title?: string;
  image?: string;
  description?: string;
  memo?: string;
  /** @default [] */
  urls?: UrlInfoTypeString[];
  /** @default [] */
  tagList?: string;
  /** @default [] */
  bookIsbnList?: { value: number }[];
}

export interface ConentsPostRequest extends ContentsCreateRequest {
  bookIsbnList?: number[];
  tagList?: string[];
}

export interface ContentsDto {
  /** @format int64 */
  id: number;
  urls: UrlInfo[];
  title?: string;
  image?: string;
  creator: UserDto;
}

export interface ContactDto {
  id: number;
  email: string;
  message: string;
  name?: string;
}

export interface BookCreateRequest {
  isbn: string;
  title: string;
  summary: string;
  /** @format date-time */
  publishedDate: string;
  detailUrl?: string;
  translator?: string;
  /** @format int32 */
  price?: number;
  titleImage?: string;
  /** @default [] */
  authorIdList?: number[];
  /** @default [] */
  authorNameList?: string[];
  /** @format int64 */
  publisherId?: number;
  publisherName?: string;
}

export interface AuthorCreateRequest {
  name: string;
  description?: string;
  profile?: string;
  /** @default [] */
  bookIsdnList?: string[];
}

export interface AuthorDto {
  /** @format int64 */
  id: number;
  name: string;
  description?: string;
  profile?: string;
  bookList: BookDto[];
}

export interface PageResponsePublisherDto {
  items: PublisherDto[];
  /** @format int64 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PublisherDto {
  /** @format int64 */
  id: number;
  name: string;
  engName?: string;
  logo?: string;
  isOfficial: boolean;
  description?: string;
  urls: UrlInfo[];
}

export interface PageResponseEventDto {
  items: EventDto[];
  /** @format int64 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ListResponseBookDto {
  items: BookDto[];
  /** @format int32 */
  length: number;
}

export interface PageResponseContentsDto {
  items: ContentsDtoChanged[];
  /** @format int64 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ListResponseContentsDto {
  items: ContentsDto[];
  /** @format int32 */
  length: number;
}

export interface ListResponseContactDto {
  items: ContactDto[];
  /** @format int32 */
  length: number;
}

export interface PageResponseBookDto {
  items: BookDto[];
  /** @format int64 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ListResponseEventDto {
  items: EventDto[];
  /** @format int32 */
  length: number;
}

export interface ListResponseRecommendedBookDto {
  items: RecommendedBookDto[];
  /** @format int32 */
  length: number;
}

export interface RecommendedBookDto {
  isbn: string;
  title: string;
  summary: string;
  /** @format date-time */
  publishedDate: string;
  titleImage?: string;
  authorList: AuthorDto[];
  translator?: string;
  /** @format int32 */
  price?: number;
  publisher: PublisherDto;
  /** @format date */
  recommendedDate: string;
}

export interface PageResponseAuthorDto {
  items: AuthorDto[];
  /** @format int64 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface SearchBookeventDto {
  keyword?: string | null;
  page?: number;
  limit?: number;
  orderBy?: string;
  direction?: "asc" | "desc";
}

export interface EventRequestDto {
  page: number;
  limit: number;
  eventFlag: "SOLO" | "GROUP" | "ETC";
  eventType?: string;
  location?: "ONLINE" | "OFFLINE";
  startDate?: string;
  endDate?: string;
}

export interface DisoveryContentsDto {
  /** @format int64 */
  id: number;
  urls: UrlInfoTypeString[];
  image?: string;
  creator: UserDto;
  createdAt: string;
}

export enum ContentsType {
  "Youtube" = "유튜브",
  "Homepage" = "홈페이지",
  "Blog" = "블로그",
  "Link" = "링크",
  "Profile" = "프로필",
}

export interface ContentsDetail {
  id: number;
  title: string;
  urls: UrlInfo;
  image: string;
  booksDtoList: BookDto[];
  tagDtoList: TagDto[];
  creator: UserDto;
}

export interface ContentsDtoChanged {
  /** @format int64 */
  id: number;
  urls: UrlInfo[];
  title?: string;
  image?: string;
  creator: UserDto;
  books: BookDto[];
  tags: TagDto[];
}
