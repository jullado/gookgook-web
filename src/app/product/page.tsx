import Image from "next/image";
import { ProductModel, ResponseError } from "@/utils/models";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProductListPage() {
  const products = [] as ProductModel[];

  try {
    const res = (await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/v1/product/all"
    )) as AxiosResponse<ProductModel[]>;

    products.push(...res.data);
  } catch (error) {
    const err = error as ResponseError;
    const errData = err.response?.data;
    if (errData) {
      if (errData.status === 401) {
        redirect("/deal");
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛍️ สินค้าและบริการ
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-48">
              <div>
                <h2 className="text-xl font-semibold mb-1">{product.title}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              <div className="text-sm text-gray-500">
                🏢 <span className="font-medium">{product.companies.name}</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  ฿{product.price}
                </span>
                <Link
                  href={`/product/${product.product_id}`}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
                >
                  เลือก
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
