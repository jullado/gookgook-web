import Image from "next/image";

const myCoupons = [
  {
    voucher_id: "09c57fba-cf8f-493b-94c8-9ccc60d21186",
    redeem: false,
    create_at: "2025-05-19T20:38:03.696Z",
    deals: {
      title: "ลด 20% ค่าตรวจสุขภาพสัตว์เลี้ยง",
      image:
        "https://plus.unsplash.com/premium_photo-1667520540385-889b3df2c46c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "โปรโมชั่นตรวจสุขภาพสัตว์เลี้ยงกับคุณหมอมืออาชีพ ลดทันที 20%",
      discount: 20,
      discount_type: "percentage",
      expires_at: "2025-06-30T23:59:59.000Z",
    },
    companies: {
      name: "Pet Health Center",
    },
  },
  {
    voucher_id: "67eaf194-9745-40d3-b584-a55f21cbfaae",
    redeem: false,
    create_at: "2025-05-20T23:53:54.222Z",
    deals: {
      title: "ลดทันที 150 บาท สำหรับตัดขนสุนัข",
      image:
        "https://images.unsplash.com/photo-1719464454959-9cf304ef4774?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "บริการตัดขนมืออาชีพ รับส่วนลด 150 บาทจากราคาปกติ!",
      discount: 150,
      discount_type: "fixed",
      expires_at: "2025-07-15T23:59:59.000Z",
    },
    companies: {
      name: "Pet Lover Center",
    },
  },
  {
    voucher_id: "4e71db77-ea6f-4972-95ff-dfb419f9f97d",
    redeem: false,
    create_at: "2025-05-21T05:30:17.888Z",
    deals: {
      title: "เข้าร่วมกิจกรรมให้ความรู้ฟรี! เรื่องการดูแลสัตว์เลี้ยง",
      image:
        "https://plus.unsplash.com/premium_photo-1661963683773-665c3f763f46?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "กิจกรรมสัมมนาออนไลน์ฟรี! แนะนำวิธีดูแลสัตว์เลี้ยงเบื้องต้น โดยผู้เชี่ยวชาญ",
      discount: 0,
      discount_type: "free",
      expires_at: "2025-07-20T23:59:59.000Z",
    },
    companies: {
      name: "Pet Health Center",
    },
  },
];

export default function MyCouponsPage() {
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
                🏢 <span className="font-medium">{coupon.companies.name}</span>
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
