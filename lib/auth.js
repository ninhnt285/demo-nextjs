import Cookies from 'js-cookie'
import { useEffect, useState } from "react";

export function getAuthHeader() {
  const currentUser = Cookies.get("currentUser");
  return {
    Authorization: `Bearer ${JSON.parse(currentUser || "{}")?.token || ""}`
  }
}

export function getCurrentUser() {
  const currentUser = Cookies.get("currentUser");
  if (currentUser) {
    return JSON.parse(currentUser)
  }
  return null;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const refetchUser = async (userId) => {
    // const userInfo = await authService.getMe(userId);
    // const currentUser = Cookies.get("currentUser");

    // if (userInfo && currentUser) {
    //   const newUser = {
    //     ...JSON.parse(currentUser),
    //     username: userInfo.username,
    //     avatar: userInfo.avatar,
    //   };
    //   Cookies.set("currentUser", JSON.stringify(newUser));
    //   setUser(newUser);
    // }
  };

  return { user, setUser, refetchUser };
};