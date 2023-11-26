"use client";
import React, { useEffect } from "react";
import Flag from "react-flagkit";
import { usePathname, useRouter } from "next/navigation";

const LanguageSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log("router: ", router);
  console.log("pathname: ", pathname);

  useEffect(() => {
    localStorage.setItem("language", pathname.split("/")[1]);
  }, [pathname]);

  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    console.log("selectedValue: ", selectedValue);
    localStorage.setItem("language", selectedValue);
    router.replace("/" + selectedValue);
  };

  return (
    <div className="relative">
      <select
        className="fixed bottom-20 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
        value={pathname.split("/")[1]}
        onChange={handleLanguageChange}
      >
        <option value="en" className="text-xl">
          🇺🇸
        </option>
        <option value="vn" className="text-xl">
          🇻🇳
        </option>
      </select>
    </div>
  );
};

export default LanguageSelect;
