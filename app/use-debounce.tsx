"use client";

import React, { useEffect, useState } from "react";

const DebounceHook = (value: string) => {
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const debouncedValue = setTimeout(() => {
      setDebounce(value);
    }, 500);

    return () => clearTimeout(debouncedValue);
  }, [value]);

  return debounce;
};

export default DebounceHook;
