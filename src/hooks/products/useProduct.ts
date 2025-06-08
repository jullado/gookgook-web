/* eslint-disable react-hooks/exhaustive-deps */
import { useLoading } from "@/contexts/loadingCtx";
import { ProductModel, VoucherModel } from "@/models/models";
import { buyProduct, fetchProduct } from "@/services/products";
import { fetchVouchers } from "@/services/users";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const useProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [product, setProduct] = useState({} as ProductModel);
  const [voucher, setVoucher] = useState([] as VoucherModel[]);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const { showLoading, hideLoading } = useLoading();
  const [soldout, setSoldout] = useState(false);

  const getProduct = async () => {
    try {
      const data = await fetchProduct(id);
      setProduct(data);
      setFinalPrice(data.price);
    } catch {
      toast.error("Unexpected error occurred");
    }
  };

  const getVoucher = async () => {
    try {
      const data = await fetchVouchers();
      const filtered = data.filter(
        (v: VoucherModel) =>
          v.deals.products?.includes(id) && v.deals.status && !v.redeem
      );
      setVoucher(filtered);
    } catch {
      toast.error("Unexpected error occurred");
    }
  };

  const hasFetched = useRef(false);
  const init = async () => {
    showLoading();
    await Promise.all([getProduct(), getVoucher()]);
    hideLoading();
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      init();
    }
  }, []);

  useEffect(() => {
    if (product && voucher) {
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

  const handleConfirm = async () => {
    await buyProduct(id, selectedCoupon);
    toast.success(
      selectedCoupon
        ? `ใช้คูปอง: ${selectedCoupon} | ราคาสุทธิ: ฿${finalPrice}`
        : `ไม่มีการใช้คูปอง | ราคาสุทธิ: ฿${finalPrice}`
    );
    init();
  };

  return {
    product,
    voucher,
    selectedCoupon,
    handleCouponSelect,
    finalPrice,
    soldout,
    handleConfirm,
  };
};
