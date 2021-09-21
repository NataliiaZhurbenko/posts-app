import { useMemo, useState } from "react";

export const usePagination = (totalPages) => {
  const pagesArray = useMemo(() => {
    let pagesArray2 = [];
    for (let i = 0; i < totalPages; i++) {
      pagesArray2.push(i + 1);
    }
    return pagesArray2;
  }, [totalPages]);
  return pagesArray;
};
