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

export interface UpdateNickNameResponse {
  nickName: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

export type JoinApiResponse = ApiResponse<JoinResponse>;
export type LoginApiResponse = ApiResponse<LoginResponse>;
export type SignupApiResponse = ApiResponse<JoinResponse>;
export type CheckNickNameApiResponse = ApiResponse<CheckNickNameResponse>;
export type UpdateNickNameApiResponse = ApiResponse<UpdateNickNameResponse>;
export type UpdatePasswordApiResponse = ApiResponse<UpdatePasswordResponse>;
