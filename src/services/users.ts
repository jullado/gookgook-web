import { SigninModel, VoucherModel } from "@/models/models";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import api from "@/libs/axios";

export async function signin(
  username: string,
  password: string
): Promise<SigninModel> {
  const res = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/signin`,
    {
      username,
      password,
    }
  );

  return res.data;
}

export async function signout(refresh_token: string): Promise<SigninModel> {
  const res = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/signout`,
    {
      refresh_token,
    }
  );

  return res.data;
}

export async function refreshToken(refresh_token: string): Promise<SigninModel> {
  const res = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/refresh`,
    {
      refresh_token,
    }
  );

  return res.data;
}

export async function fetchVouchers() {
  const res = (await api.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/v1/user/vouchers",
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  )) as AxiosResponse<VoucherModel[]>;
  return res.data;
}
