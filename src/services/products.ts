import { ProductModel } from "@/models/models";
import api from "@/libs/axios";
import Cookies from "js-cookie";

export const fetchAllProducts = async (): Promise<ProductModel[]> => {
  const res = await api.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/v1/product/all"
  );
  return res.data;
};

export const fetchProduct = async (id: string): Promise<ProductModel> => {
  const res = await api.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/v1/product/" + id
  );
  return res.data;
};

export const buyProduct = async (
  id: string,
  selectedCoupon: string | null
): Promise<{message: string}> => {
  const res = await api.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/v1/user/buy/product/" + id,
    {
      voucher_id: selectedCoupon || "",
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );

  return res.data;
};
