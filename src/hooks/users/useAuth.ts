import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { useAuthModal } from "@/contexts/authCtx";
import { signin, signout } from "@/services/users";

export const useAuth = () => {
  const { showModal, closeModal } = useAuthModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { access_token, refresh_token } = await signin(username, password);

      Cookies.set("access_token", access_token);
      Cookies.set("refresh_token", refresh_token);

      closeModal();
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signout(Cookies.get("refresh_token") as string);
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  };

  const fillDefaultCredentials = () => {
    setUsername("user");
    setPassword("123456");
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    login,
    logout,
    fillDefaultCredentials,
    showModal,
  };
};
