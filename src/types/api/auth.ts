import { ApiResponse } from './common';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface JoinResponse {
  message: string;
}
export interface CheckNickNameResponse {
  available: boolean;
  message: string;
}

export interface UpdateNickNameResponseData {
  nickName: string;
}

export interface UpdatePasswordResponseData {
  message: string;
}

export type JoinApiResponse = ApiResponse<JoinResponse>;
export type LoginApiResponse = ApiResponse<LoginResponse>;
export type SignupApiResponse = ApiResponse<JoinResponse>;
export type CheckNickNameApiResponse = ApiResponse<CheckNickNameResponse>;
export type UpdateNickNameResponse = ApiResponse<UpdateNickNameResponseData>;
export type UpdatePasswordResponse = ApiResponse<UpdatePasswordResponseData>;
