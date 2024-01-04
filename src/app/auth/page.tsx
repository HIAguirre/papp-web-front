"use client";

import Image from "next/image";
import { SubmitButton } from "@/app/_components/submit.button";
import { login } from "./actions";
import { useEffect, useState } from "react";
import { ErrorDialog } from "../_components/error.dialog";
import { useRouter } from "next/navigation";
import useStore from "../_hooks/store";

type StateType = {
  success?: boolean;
  data?: any;
  error?: any;
};

const Auth = () => {
  const [state, setState] = useState<StateType>({});

  const router = useRouter();

  const store = useStore((state) => state);

  useEffect(() => {
    store.removeUser();
  }, []);

  const submit = async (formData: FormData) => {
    const res = await login(formData);
    setState(res);
    if (res.success && res.data) {
      store.setUser(res.data);
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center mt-10">
        <Image src="/isotipo.png" alt="Logo" width={300} height={600} />
        <p className="mt-4 text-4xl">Papelera</p>
        <p className="mt-1 text-5xl text-sky-700 font-bold antialiased">
          Progreso
        </p>
        <p className="mt-6 text-xl">evolución continua</p>
        <p className="mt-1 text-xl">www.papprogreso.com</p>
      </div>

      <div className="flex flex-col items-center mt-10">
        <p className="font-bold">Inicia sesión</p>
        <form className="flex flex-col items-center" action={submit}>
          <input
            className="mt-4 px-4 py-2 border border-gray-300 rounded text-black w-full"
            type="email"
            placeholder="Correo electrónico"
            name="email"
          />
          <div className="flex flex-row">
            <input
              className="mt-4 px-4 py-2 border border-gray-300 rounded-l text-black"
              type={"password"}
              placeholder="Contraseña"
              name="password"
            />
          </div>
          <SubmitButton
            text="Iniciar sesión"
            style={`mt-4 px-4 py-2 bg-sky-700 text-white rounded`}
          />
        </form>
        {state?.error && (
          <ErrorDialog text={JSON.stringify(state.error, null, 2)} />
        )}
      </div>
    </div>
  );
};

export default Auth;
