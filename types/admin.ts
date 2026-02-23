import {
  ContactDto,
  ContentsCreateRequest,
  ContentsDetail,
  EventCreateRequest,
  PublisherCreateRequest,
  PublisherDetail,
} from "./dto";

export type DefaultValueTypes =
  | ContentsCreateRequest
  | EventCreateRequest
  | PublisherCreateRequest
  | ContactDto
  | PublisherDetail
  | ContentsDetail;

export interface LoginProps {
  username: string;
  password: string;
}

export interface LoginResType {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: LoginUserTypes;
}

export interface LoginUserTypes {
  id: number;
  username: string;
  role: string;
}
