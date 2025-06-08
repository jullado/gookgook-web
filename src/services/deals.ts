import { DealsModel } from "@/models/models";
import Cookies from "js-cookie";
import api from "@/libs/axios";

export async function fetchAllDeals(): Promise<DealsModel[]> {
  const res = await api.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/v1/deal/all"
  );
  return res.data;
}

export async function fetchDeal(id: string): Promise<DealsModel> {
  const res = await api.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/v1/deal/" + id
  );
  return res.data;
}

export async function fetchVoucher(id: string): Promise<boolean> {
  const res = await api.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/v1/user/voucher/" + id,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );
  return res.data;
}

export async function claimVoucher(id: string): Promise<void> {
  await api.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/v1/user/voucher/" + id,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );
}
