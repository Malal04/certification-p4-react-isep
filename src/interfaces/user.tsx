import { Role } from "../enums/role";

export interface User {
  verificationId: number;
  countryCode: string;
  frirstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  role: Role;
}

export interface LoginPayload {
  countryCode: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterPayload {
  countryCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

export interface Countrie {
  id: number;
  code: string;
  iso2: string;
  iso3: string;
  name: string;
  telephoneCode: string;
}

export interface Order {
 id: number;
 label: string;
 quantity: number;
 price: number;
 orderDate: string;
}