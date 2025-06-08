"use client";

import Image from "next/image";
import { DealsModel } from "@/models/models";
import Loading from "@/components/loading";
import { useProduct } from "@/hooks/products/useProduct";

export default function ProductDetailPage() {
  const prod = useProduct();

  function couponFormat(deal: DealsModel) {
    if (deal.discount_type === "fixed") {
      return <span>ลด {deal.discount} บาท</span>;
    } else if (deal.discount_type === "percentage") {
      return <span>ลด {deal.discount} %</span>;
    } else {
      return <span>ฟรี</span>;
    }
  }

  if (!prod.product) {
    return <Loading message="กำลังโหลดข้อมูลสินค้า" />;
  }

  if (!prod.voucher) {
    return <Loading message="กำลังโหลดข้อมูลคูปอง" />;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{prod.product.title}</h1>
      {prod.product.image?.length && (
        <Image
          src={prod.product.image}
          alt={prod.product.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}
      <div className="space-y-2 text-gray-700">
        <p>{prod.product.description}</p>
        <p>
          ราคา:{" "}
          {prod.selectedCoupon && (
            <>
              <span className="line-through text-red-400">
                ฿{prod.product.price}
              </span>{" "}
            </>
          )}
          <span className="font-semibold text-blue-600">฿{prod.finalPrice}</span>
        </p>
        <p>
          หมวดหมู่: <span className="capitalize">{prod.product.category}</span>
        </p>
        <p>
          จำนวนคงเหลือ:{" "}
          {prod.product.unlimited ? "ไม่จำกัด" : `${prod.product.amount} ชิ้น`}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          🏢 บริษัท: {prod.product.companies?.name} | โทร: {prod.product.companies?.phone}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">🎟️ เลือกคูปองที่ต้องการ</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200">
            <input
              type="radio"
              name="coupon"
              checked={prod.selectedCoupon === null}
              onChange={() => prod.handleCouponSelect(null)}
            />
            <span>ไม่ใช้คูปอง</span>
          </label>

          {prod.voucher.map((coupon) => (
            <label
              key={coupon.voucher_id}
              className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              <input
                type="radio"
                name="coupon"
                checked={prod.selectedCoupon === coupon.voucher_id}
                onChange={() => prod.handleCouponSelect(coupon.voucher_id)}
              />
              <span>
                {couponFormat(coupon.deals)}
                👉 <span className="text-gray-400">{coupon.deals?.title}</span>
              </span>
            </label>
          ))}
        </div>

        <button
          disabled={prod.soldout}
          onClick={prod.handleConfirm}
          className="cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          {prod.soldout ? "สินค้าหมด" : "✅ ยืนยันการสั่งซื้อ"}
        </button>
      </div>
    </div>
  );
}
