"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type AuthModalContextType = {
  showModal: boolean;
  closeModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextType>({
  showModal: false,
  closeModal: () => {},
});

export const useAuthModal = () => useContext(AuthModalContext);

export const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      setShowModal(true);
    }
  }, []);

  const closeModal = () => setShowModal(false);

  return (
    <AuthModalContext.Provider value={{ showModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};
