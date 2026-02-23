import {
  ContentsDetail,
  Detail,
  ListResponseContentsDto,
  PageResponseBookDto,
  PageResponsePublisherDto,
  PublisherDetail,
} from "@/types/dto";
import { getRequest } from "./commonGet";

export const getPublishers = () =>
  getRequest<PageResponsePublisherDto>(
    "/publishers?page=0&limit=20&orderBy=CreatedAt&direction=desc"
  );

export const getBookContents = (isbn: string) =>
  getRequest<ListResponseContentsDto>(`books/${isbn}/contents`);

export const getBirthdayBooks = (month: string, day: string) =>
  getRequest<PageResponseBookDto>(
    `/books/birthday?month=${month}&day=${day}&page=0&limit=10&orderBy=Title&direction=asc`
  );

export const getBookDetail = (isbn: number) =>
  getRequest<Detail>(`/books/{isbn}?isbn=${isbn}`);

export const getPublisherDetail = (id: number) =>
  getRequest<PublisherDetail>(`/publishers/${id}`);

export const getContentDetail = (id: number) =>
  getRequest<ContentsDetail>(`/contents/${id}`);
