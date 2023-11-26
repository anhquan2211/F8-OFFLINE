import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center align-center">
      <Image src="/404.jpg" alt="404" width={800} height={1000} />
    </div>
  );
};

export default NotFound;
