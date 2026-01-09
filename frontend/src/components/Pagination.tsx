"use client";

import { ArrowRightIcon } from "lucide-react";
import React from "react";

// ---------- Types ----------
type PaginationProps = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
};

export default function Pagination({
    page,
    totalPages,
    onChange,
}: PaginationProps) {
    const getPageNumbers = (): number[] => {
        const pages: number[] = [];
        const delta = 1;

        pages.push(1);

        for (let i = page - delta; i <= page + delta; i++) {
            if (i > 1 && i < totalPages) {
                pages.push(i);
            }
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return Array.from(new Set(pages)).sort((a, b) => a - b);
    };

    const pageNumbers = getPageNumbers();

    if (totalPages <= 1) return null;

    return (
        <div className="px-6 py-4">
            <div className="flex items-center justify-center gap-3">
                {/* Previous */}
                <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => onChange(page - 1)}
                    className="inline-flex items-center justify-center rounded-lg bg-white px-2 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50 disabled:opacity-50"
                >
                    <span className="rotate-180">
                        <ArrowRightIcon />
                    </span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                    {pageNumbers.map((pg, i) => {
                        const prev = pageNumbers[i - 1];

                        if (prev && pg - prev > 1) {
                            return (
                                <React.Fragment key={pg}>
                                    <span className="px-2 text-gray-400">…</span>
                                    <PageButton pg={pg} page={page} onChange={onChange} />
                                </React.Fragment>
                            );
                        }

                        return (
                            <PageButton
                                key={pg}
                                pg={pg}
                                page={page}
                                onChange={onChange}
                            />
                        );
                    })}
                </div>

                {/* Next */}
                <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => onChange(page + 1)}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                    <ArrowRightIcon />
                </button>
            </div>
        </div>
    );
}

// ---------- Page Button ----------
type PageButtonProps = {
    pg: number;
    page: number;
    onChange: (page: number) => void;
};

function PageButton({ pg, page, onChange }: PageButtonProps) {
    const active = pg === page;

    return (
        <button
            type="button"
            onClick={() => onChange(pg)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all
        ${active
                    ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-indigo-50"
                }`}
        >
            {pg}
        </button>
    );
}
