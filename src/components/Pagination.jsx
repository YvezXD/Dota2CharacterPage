import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
}) {
  if (totalPages <= 1) return null;

  // Generate page numbers with smart ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-[#232a3b] mt-8 text-xs font-mono">
      {/* Results Counter */}
      <div className="text-slate-400">
        Showing <span className="text-[#e2b76b] font-bold">{totalItems === 0 ? 0 : startIndex + 1}</span> to{' '}
        <span className="text-[#e2b76b] font-bold">{Math.min(endIndex, totalItems)}</span> of{' '}
        <span className="text-white font-bold">{totalItems}</span> heroes
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1.5">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-[#131722] border border-[#232a3b] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg bg-[#131722] border border-[#232a3b] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, idx) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 text-slate-600 select-none">
                  ...
                </span>
              );
            }

            const active = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 rounded-lg font-bold transition-all ${
                  active
                    ? 'bg-[#e2b76b] text-black shadow-[0_0_12px_rgba(226,183,107,0.35)]'
                    : 'bg-[#131722] border border-[#232a3b] text-slate-300 hover:text-white hover:border-slate-500'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg bg-[#131722] border border-[#232a3b] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1 transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-[#131722] border border-[#232a3b] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

