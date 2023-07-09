"use client";
import React from "react";
import { categoryFilters } from "@/constants";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
function Categories() {
  const route = useRouter();
  const searchParam = useSearchParams();
  const path = usePathname();
  const handleFillterClick = (filter: string) => {
     return route.push(`${path}?category=${filter}`);
  };
  const category = searchParam.get("category");
  return (
    <div className="flex gap-2 overflow-auto shadow">
      {categoryFilters.map((filter) => (
        <button
          type="button"
          onClick={() => handleFillterClick(filter)}
          className={`${
            category == filter
              ? "bg-light-white-300 font-medium"
              : "font-noraml"
          } p-3.5 rounded-lg whitespace-nowrap capitalize`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default Categories;
