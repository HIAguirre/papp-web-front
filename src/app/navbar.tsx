"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { authenticatedFromLocal, logout } from "./actions";
import Link from "next/link";
import useStore from "./_hooks/store";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const store = useStore((state) => state);
  const user = store.user;
  const router = useRouter();

  useLayoutEffect(() => {
    const checkUserInLocal = async () => {
      const user = await authenticatedFromLocal();
      if (user) {
        store.setUser(user);
      }
    };
    checkUserInLocal();
  }, []);

  const handleLogout = async () => {
    logout();
    store.removeUser();
  };

  return (
    <nav>
      <div className="flex items-center justify-between h-16 mb-4">
        <div className="flex items-center">
          <Image
            src="/isotipo.png"
            alt="Logo"
            width={50}
            height={50}
            onClick={() => router.push("/")}
          />
          <Link className="ml-4 md:visible invisible text-2xl" href={"/"}>
            Papelera Progreso
          </Link>
        </div>
        <div className="flex">
          {user?.token ? (
            <>
              <Link
                className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mr-4"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mr-4"
                href="/sales"
              >
                Ventas
              </Link>
            </>
          ) : null}
          {user === null ? null : !user?.token ? (
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded ml-4"
              href="/auth"
            >
              Ingresar
            </Link>
          ) : (
            <Link
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded ml-4"
              onClick={handleLogout}
              href="/auth"
            >
              Salir
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
