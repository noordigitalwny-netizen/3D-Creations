"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface AuthState {
  error?: string;
  success?: boolean;
}

export async function loginAdmin(
  arg1: any,
  arg2?: any
): Promise<AuthState | void> {
  const formData = arg2 instanceof FormData ? arg2 : arg1 instanceof FormData ? arg1 : null;

  if (!formData) {
    return { error: "Invalid form submission." };
  }

  const username = (formData.get("username") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  const validUsername = (process.env.ADMIN_USERNAME || "admin").trim();
  const validPassword = (process.env.ADMIN_PASSWORD || "admin123").trim();

  if (!username || !password) {
    return { error: "Please enter both username and password." };
  }

  if (username !== validUsername || password !== validPassword) {
    return { error: "Invalid username or password." };
  }

  const cookieStore = cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
