"use server";

import { cookies } from "next/headers";

export const authenticatedFromLocal = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  const username = cookiesStore.get("username")?.value;
  const email = cookiesStore.get("email")?.value;
  const role = cookiesStore.get("role")?.value;
  return { token, username, email, role };
};

export const logout = () => {
  const cookiesStore = cookies();
  cookiesStore.delete("name");
  cookiesStore.delete("token");
  cookiesStore.delete("username");
  cookiesStore.delete("email");
  cookiesStore.delete("role");
};
