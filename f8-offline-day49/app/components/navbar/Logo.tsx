"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      src="/images/logo.png"
      alt="Logo"
      height="60"
      width="60"
      className="hidden md:block cursor-pointer rounded-lg"
    />
  );
};

export default Logo;
