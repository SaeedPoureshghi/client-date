import { WebAppInitData } from "@twa-dev/types";
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium: boolean;
}

export interface ProfileType {
  userid: number;
  username: string;
  firstname: string;
  lastname: string;
  language_code: string;
  is_premium: boolean;
  created_at?: string;
  nickname: string;
  age: number;
  gender: string;
  city: string;
  pic?: string;
  balance: number;
  uuid: string;
}

export interface CityOptions {
  value: string;
  label: string;
}

export interface ProfileProps {
  nickname: string;
  age: number;
  gender: string;
  city: string;
  pic: string;
}
export interface HeaderProps {
  user: User;
  profile: ProfileType;
}

export interface useUserProps {
  initData: WebAppInitData;
}

export interface Meta {
  fee: number;
  version: number;
  owner: string;
}
