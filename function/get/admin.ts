import { PageResponseContentsDto, PageResponsePublisherDto } from "@/types/dto";
import { getRequest, getRequestForAdmin } from "./commonGet";

export const getAdminKakaoBooks = () => getRequestForAdmin("/kakao-books");

export const getAdminViewLogs = () => getRequestForAdmin("/book-view-logs");

export const getAdminSearchLogs = () => getRequestForAdmin("/book-search-logs");

export const getAdminPublishers = () =>
  getRequest<PageResponsePublisherDto>(
    "/publishers?page=0&limit=500&orderBy=CreatedAt&direction=desc"
  );

export const getAdminContents = () =>
  getRequest<PageResponseContentsDto>(
    "/contents?page=0&limit=200&orderBy=CreatedAt&direction=desc"
  );
