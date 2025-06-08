import { VoucherModel } from "@/models/models";
import { fetchVouchers } from "@/services/users";
import { useEffect, useRef, useState } from "react";
import toast from 'react-hot-toast';

export const useVoucher = () => {
  const [myCoupons, setVouchers] = useState<VoucherModel[]>([]);

  const getVouchers = async () => {
    try {
      const data = await fetchVouchers();
      setVouchers(data);
    } catch {
      toast.error("Unexpected error occurred");
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getVouchers();
    }
  }, []);

  return { myCoupons };
};
