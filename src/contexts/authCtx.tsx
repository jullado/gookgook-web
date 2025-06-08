"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import SigninModal from '@/components/signInModal';

type AuthModalContextType = {
  showModal: boolean;
  closeModal: () => void;
};

// สร้าง context สําหรับ provider
const AuthModalContext = createContext<AuthModalContextType>({
  showModal: false,
  closeModal: () => {},
});

// export context ของ provider เพื่อให้ component อื่นสามารถใช้งานได้
export const useAuthModal = () => useContext(AuthModalContext);

export const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");
    if (!token || !refreshToken) {
      setShowModal(true);
    }
  }, []);

  const closeModal = () => setShowModal(false);

  return (
    // ส่งค่า showModal และ closeModal เพื่อให้ component อื่นสามารถใช้งานได้
    <AuthModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {showModal && <SigninModal />}
    </AuthModalContext.Provider>
  );
};
