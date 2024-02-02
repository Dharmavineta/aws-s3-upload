"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const Button = () => {
  const { pending } = useFormStatus();
  return (
    <button aria-disabled={pending} type="submit" className="bg-sky-500 w-full">
      {pending ? <p>Loading...</p> : <p>Submit</p>}
    </button>
  );
};

export default Button;
