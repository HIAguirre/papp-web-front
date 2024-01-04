"use server";
import { cookies } from "next/headers";

type ResponseType = {
  message: string;
  name: string;
  token: string;
  username: string;
  email: string;
  role: string;
};

export const login = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const response = await fetch(`${process.env.API}/login/credentials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data: ResponseType = await response.json();
  if (response.ok) {
    const cookiesStore = cookies();
    cookiesStore.set("name", data.name);
    cookiesStore.set("token", data.token);
    cookiesStore.set("username", data.username);
    cookiesStore.set("email", data.email);
    cookiesStore.set("role", data.role);
    return {
      success: true,
      data,
    };
  }
  return { success: false, error: data };
};
