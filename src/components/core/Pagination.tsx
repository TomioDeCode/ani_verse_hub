import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  loading,
}) => {
  const handlePageChange = (direction: "prev" | "next") => {
    setCurrentPage((prev) =>
      direction === "prev"
        ? Math.max(prev - 1, 1)
        : Math.min(prev + 1, totalPages)
    );
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Button
        onClick={() => handlePageChange("prev")}
        disabled={currentPage === 1 || loading}
        className="bg-gray-700 hover:bg-gray-600"
      >
        <ChevronLeft size={24} />
      </Button>
      <span className="text-white">
        {currentPage} / {totalPages}
      </span>
      <Button
        onClick={() => handlePageChange("next")}
        disabled={currentPage === totalPages || loading}
        className="bg-gray-700 hover:bg-gray-600"
      >
        <ChevronRight size={24} />
      </Button>
    </div>
  );
};
