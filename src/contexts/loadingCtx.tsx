"use client";

import { createContext, useContext, useState } from "react";
import Loading  from "@/components/loading";

type LoadingContextType = {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

// สร้าง context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// export context ของ provider เพื่อให้ component อื่นสามารถใช้งานได้
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within LoadingProvider");
  return context;
};

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
      {loading && <Loading />}
    </LoadingContext.Provider>
  );
};
