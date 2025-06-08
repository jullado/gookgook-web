"use client";

import Image from "next/image";
import { useVoucher } from '@/hooks/vouchers/useVouchers';

export default function MyCouponsPage() {
  const { myCoupons } = useVoucher();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🎫 คูปองของฉัน</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myCoupons.map((coupon) => (
          <div
            key={coupon.voucher_id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4 space-y-2 border border-gray-200"
          >
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image
                src={coupon.deals.image}
                alt={coupon.deals.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="py-2 flex flex-col justify-between h-48">
              <h2 className="text-lg font-semibold text-blue-700">
                {coupon.deals.title}
              </h2>
              <p className="text-sm text-gray-600">
                {coupon.deals.description}
              </p>
              <p className="text-sm">
                🏢{" "}
                <span className="font-medium">
                  {coupon.companies.name}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                ใช้ได้ถึง:{" "}
                {new Date(coupon.deals.expires_at).toLocaleDateString("th-TH")}
              </p>
              <div hidden={!coupon.redeem}>
                <span
                  className={`px-3 py-1 rounded-lg text-white text-sm font-medium bg-gray-400`}
                >
                  ใช้แล้ว
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
