/* eslint-disable react-hooks/exhaustive-deps */
import { DealsModel } from "@/models/models";
import { useLoading } from "@/contexts/loadingCtx";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchAllDeals } from "@/services/deals";
import toast from "react-hot-toast";

export const useDeals = () => {
  const [deals, setDeals] = useState<DealsModel[]>([]);
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();

  // get all deals
  const getDeals = async () => {
    showLoading();
    try {
      const data = await fetchAllDeals();
      setDeals(data);
    } catch {
      toast.error("Unexpected error occurred");
    } finally {
      hideLoading();
    }
  };

  // select deal
  const showDetail = (dealId: string) => {
    router.push(`/deal/${dealId}`);
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getDeals();
    }
  }, []);

  return { deals, showDetail };
};
