 "use client";

import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useDealPage } from "@/hooks/deals/useDealPage";

dayjs.locale("th");

export default function DealDetailPage() {
  const { deal, isClaimed, handleClaim } = useDealPage();
  const isExpired = dayjs().isAfter(dayjs(deal.expires_at));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-lg overflow-hidden shadow-lg">
        {/* Image section */}
        <div className="relative h-[300px] sm:h-[400px]">
          {deal.image && (
            <Image
              src={deal.image || ""}
              alt={deal.title || ""}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded">
            {isExpired ? "หมดเขตแล้ว" : "ยังเปิดให้ใช้งาน"}
          </div>
        </div>

        {/* Content section */}
        <div className="bg-white p-6">
          <h1 className="text-2xl font-bold mb-2">{deal.title}</h1>
          <p className="text-gray-700 mb-4">{deal.description}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="font-semibold">วันเริ่มต้น:</span>{" "}
              {dayjs(deal.start_at).format("D MMMM YYYY")}
            </div>
            <div>
              <span className="font-semibold">วันหมดเขต:</span>{" "}
              {dayjs(deal.expires_at).format("D MMMM YYYY")}
            </div>
            <div>
              <span className="font-semibold">ประเภท:</span>{" "}
              {deal.category === "discount" ? "ส่วนลด" : deal.category}
            </div>
            <div>
              <span className="font-semibold">จำนวนสิทธิ์คงเหลือ:</span>{" "}
              {deal.amount}
            </div>
            <div>
              <span className="font-semibold">ส่วนลด:</span> {deal.discount}
              {deal.discount_type === "percentage" ? "%" : " บาท"}
            </div>
          </div>

          <hr className="my-4" />

          {/* Company section */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">บริษัทที่ให้สิทธิ์</h2>
            <p>{deal.companies?.name}</p>
            <p className="text-sm text-gray-500">
              📞 {deal.companies?.phone} | ✉️ {deal.companies?.email}
            </p>
          </div>

          {/* รับสิทธิ์ button */}
          {deal.deal_type === "active" && !isExpired && deal.amount && (
            <button
              disabled={isClaimed}
              className="cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
              onClick={handleClaim}
            >
              {isClaimed ? "รับสิทธิ์แล้ว" : "🎁 รับสิทธิ์นี้"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
