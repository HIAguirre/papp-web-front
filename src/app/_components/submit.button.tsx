"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ text, style }: { text: string; style: string }) {
  const { pending } = useFormStatus();

  return (
    <div>
      <button
        type="submit"
        className={style + (pending ? " opacity-50 cursor-not-allowed" : "")}
        aria-disabled={pending}
        disabled={pending}
      >
        {text}
      </button>
    </div>
  );
}
