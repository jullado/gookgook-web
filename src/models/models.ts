import { AxiosError } from "axios";

export class ResponseError extends AxiosError<{
  error: string;
  status: number;
}> {}

export type SigninModel = {
  access_token: string;
  refresh_token: string;
}

export type DealsModel = {
  deal_id: string;
  deal_type: string;
  title: string;
  image: string;
  description: string;
  companies: CompanyModel;
  status: boolean;
  start_at: Date;
  discount: number;
  discount_type: string;
  category: string;
  expires_at: Date;
  amount: number;
  create_at: Date;
  products: string[];
  min_price: number;
  max_discount: number;
}

export type CompanyModel = {
  company_id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export type ProductModel = {
  image: string;
  title: string;
  description: string;
  price: number;
  product_id: string;
  category: string;
  amount: number;
  unlimited: boolean;
  companies: CompanyModel;
};

export type VoucherModel = {
  voucher_id: string;
  deal_id: string;
  user_id: string;
  redeem: boolean;
  create_at: Date;
  deals: DealsModel;
  companies: CompanyModel;
  products: string[];
}