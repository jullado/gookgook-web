"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { useDeals } from '@/hooks/deals/useDeals';

export default function DealPage() {
  const { deals, showDetail } = useDeals();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
        🌟 สิทธิพิเศษสำหรับคุณ 🌟
      </h1>

      <div className="w-full max-w-4xl">
        <Swiper
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 100,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {deals.map((deal) => (
            <SwiperSlide key={deal.deal_id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group transition-transform hover:scale-105 duration-300 max-w-md mx-auto">
                <div className="relative">
                  <Image
                    src={deal.image || ""}
                    alt={deal.title || ""}
                    width={800}
                    height={450}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300" />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {deal.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {deal.description}
                  </p>
                  <button
                    onClick={() => showDetail(deal.deal_id)}
                    className="cursor-pointer mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
