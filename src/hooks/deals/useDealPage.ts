/* eslint-disable react-hooks/exhaustive-deps */
import { useLoading } from "@/contexts/loadingCtx";
import { DealsModel } from "@/models/models";
import { fetchDeal, fetchVoucher, claimVoucher } from "@/services/deals";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const useDealPage = () => {
  const { id } = useParams<{ id: string }>();
  const [deal, setDeal] = useState({} as DealsModel);
  const [isClaimed, setIsClaimed] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  // get deal by id
  const getDealDetail = async () => {
    try {
      const data = await fetchDeal(id);
      setDeal(data);
    } catch {
      toast.error("Unexpected error occurred");
    }
  };

  // check voucher
  const verifyVoucher = async () => {
    try {
      const data = await fetchVoucher(id);
      setIsClaimed(data);
    } catch {
      toast.error("Unexpected error occurred");
    }
  };

  // claim voucher
  const claimUserVoucher = async () => {
    try {
      await claimVoucher(id);
      setIsClaimed(true);
      toast.success("รับสิทธิ์สําเร็จ");
    } catch {
      toast.error("Unexpected error occurred");
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    const init = async () => {
      showLoading();
      await Promise.all([getDealDetail(), verifyVoucher()]);
      hideLoading();
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      init();
    }
  }, [id]);

  return { deal, isClaimed, handleClaim: claimUserVoucher };
};
