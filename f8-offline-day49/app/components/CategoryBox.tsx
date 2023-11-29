"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  labelVn: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  labelVn,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: {
      category?: string;
    } = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-gray-500 transition cursor-pointer
        text-gray-800
        dark:text-gray-400 dark:hover:text-gray-50
        ${
          selected
            ? "border-b-primary dark:border-b-gray-50"
            : "border-transparent"
        }
        ${selected ? "!text-gray-900 dark:!text-white" : "text-gray-800"}
    `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm whitespace-nowrap overflow-auto">
        {labelVn}
      </div>
    </div>
  );
};

export default CategoryBox;
