/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HandleResponseError } from "@/utils/functions";
import axios, { AxiosResponse } from "axios";
import { DealsModel, ProductModel, VoucherModel } from "@/utils/models";
import Cookies from "js-cookie";
import { useLoading } from "@/app/contexts/loadingCtx";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [product, setProduct] = useState({} as ProductModel);
  const [voucher, setVoucher] = useState([] as VoucherModel[]);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const { showLoading, hideLoading } = useLoading();
  const [soldout, setSoldout] = useState(false);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/product/" + id
      );
      setProduct(res.data);
      setFinalPrice(res.data.price);
    } catch (error) {
      HandleResponseError(error);
    }
  };

  const getVoucher = async () => {
    try {
      const res = (await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/user/vouchers",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      )) as AxiosResponse<VoucherModel[]>;

      const filtered = res.data.filter((v: VoucherModel) =>
        v.deals.products?.includes(id) && v.deals.status && !v.redeem
      );
      setVoucher(filtered);
    } catch (error) {
      HandleResponseError(error);
    }
  };

  useEffect(() => {
    showLoading();

    getProduct();
    getVoucher();
  }, []);

  useEffect(() => {
    if (product && voucher) {
      hideLoading();
      setSoldout(product.amount <= 0 && !product.unlimited);
    }
  }, [product, voucher]);

  useEffect(() => {
    if (!selectedCoupon) {
      setFinalPrice(product.price || 0);
      return;
    }

    const selected = voucher.find((v) => v.voucher_id === selectedCoupon);
    if (selected && selected.deals && selected.deals.discount) {
      let discount = 0;
      const price = product.price || 0;
      switch (selected.deals.discount_type) {
        case "fixed":
          discount = selected.deals.discount;
          break;
        case "percentage":
          discount = (selected.deals.discount / 100) * price;
          break;
        case "free":
          discount = price;
          break;
      }
      if (selected.deals.max_discount) {
        discount = Math.min(discount, selected.deals.max_discount);
      }
      discount = Math.min(discount, price);
      const newPrice = Math.max(price - discount, 0);
      setFinalPrice(newPrice);
    }
  }, [selectedCoupon, product, voucher]);

  const handleCouponSelect = (couponId: string | null) => {
    setSelectedCoupon(couponId);
  };

  function couponFormat(deal: DealsModel) {
    if (deal.discount_type === "fixed") {
      return <span>ลด {deal.discount} บาท</span>;
    } else if (deal.discount_type === "percentage") {
      return <span>ลด {deal.discount} %</span>;
    } else {
      return <span>ฟรี</span>;
    }
  }

  const handleConfirm = async () => {
    try {
      await axios.post(
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
      toast.success(
        selectedCoupon
          ? `ใช้คูปอง: ${selectedCoupon} | ราคาสุทธิ: ฿${finalPrice}`
          : `ไม่มีการใช้คูปอง | ราคาสุทธิ: ฿${finalPrice}`
      );
      showLoading();
      getProduct();
      getVoucher();
    } catch (error) {
      HandleResponseError(error);
    }
  };

  if (!product) {
    return (
      <div className="text-center py-10 text-gray-500">
        กำลังโหลดข้อมูลสินค้า...
      </div>
    );
  }

  if (!voucher) {
    return (
      <div className="text-center py-10 text-gray-500">
        กำลังโหลดข้อมูลคูปอง...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
      {product.image?.length && (
        <Image
          src={product.image}
          alt={product.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}
      <div className="space-y-2 text-gray-700">
        <p>{product.description}</p>
        <p>
          ราคา:{" "}
          {selectedCoupon && (
            <>
              <span className="line-through text-red-400">
                ฿{product.price}
              </span>{" "}
            </>
          )}
          <span className="font-semibold text-blue-600">฿{finalPrice}</span>
        </p>
        <p>
          หมวดหมู่: <span className="capitalize">{product.category}</span>
        </p>
        <p>
          จำนวนคงเหลือ:{" "}
          {product.unlimited ? "ไม่จำกัด" : `${product.amount} ชิ้น`}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          🏢 บริษัท: {product.companies?.name} | โทร: {product.companies?.phone}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">🎟️ เลือกคูปองที่ต้องการ</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200">
            <input
              type="radio"
              name="coupon"
              checked={selectedCoupon === null}
              onChange={() => handleCouponSelect(null)}
            />
            <span>ไม่ใช้คูปอง</span>
          </label>

          {voucher.map((coupon) => (
            <label
              key={coupon.voucher_id}
              className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              <input
                type="radio"
                name="coupon"
                checked={selectedCoupon === coupon.voucher_id}
                onChange={() => handleCouponSelect(coupon.voucher_id)}
              />
              <span>
                {couponFormat(coupon.deals)}
                👉 <span className="text-gray-400">{coupon.deals?.title}</span>
              </span>
            </label>
          ))}
        </div>

        <button
          disabled={soldout}
          onClick={handleConfirm}
          className="cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          {soldout ? "สินค้าหมด" : "✅ ยืนยันการสั่งซื้อ"}
        </button>
      </div>
    </div>
  );
}
