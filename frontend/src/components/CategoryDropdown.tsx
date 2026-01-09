"use client";

import { useQuery } from "@apollo/client/react";
import { ChevronDown, Check } from "lucide-react";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { GET_CATEGORIES } from "../graphql/queries";

// Define the expected shape of the categories data
interface Category {
    id: number | string;
    name: string;
}

interface GetCategoriesData {
    categories: {
        categories: Category[];
    };
}

// ---------- Props ----------
export interface CategoryDropdownProps {
    selected: number[];
    onChange: (value: number[]) => void;
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

// ---------- Component ----------
const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
    selected,
    onChange,
    label,
    error,
    fullWidth = false,
}) => {
    const { data, loading } = useQuery<GetCategoriesData>(GET_CATEGORIES);

    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // ---------- Close on outside click ----------
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // ---------- Handlers ----------
    const toggle = useCallback(
        (id: number) => {
            onChange(
                selected.includes(id)
                    ? selected.filter((x) => x !== id)
                    : [...selected, id]
            );
        },
        [onChange, selected]
    );

    const clearAll = useCallback(() => {
        onChange([]);
    }, [onChange]);

    // if (loading || !data) return null;

    const categories = data?.categories?.categories ?? [];

    return (
        <div
            ref={dropdownRef}
            className={`relative ${fullWidth ? "w-full" : ""}`}
        >
            {label && (
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((s) => !s)}
                className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-2 text-sm font-medium shadow-sm
          ${fullWidth ? "w-full" : ""}
          ${error ? "border-red-500" : "border-gray-300"}
          bg-white text-gray-700 hover:bg-gray-50`}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span>
                    {selected.length
                        ? `${selected.length} selected`
                        : "Select categories"}
                </span>

                <div className="flex items-center gap-2">
                    {selected.length > 0 && (
                        <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">
                            {selected.length}
                        </span>
                    )}
                    <ChevronDown size={16} />
                </div>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <p className="text-sm font-semibold text-gray-800">
                            Select categories
                        </p>

                        {selected.length > 0 && (
                            <button
                                type="button"
                                onClick={clearAll}
                                className="text-xs font-medium text-indigo-600 hover:underline"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="max-h-60 overflow-auto p-2">
                        {categories.map((category) => {
                            const id = Number(category.id);
                            const active = selected.includes(id);

                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => toggle(id)}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition
                    ${active
                                            ? "bg-indigo-50 text-indigo-700"
                                            : "hover:bg-gray-100"
                                        }`}
                                    role="option"
                                    aria-selected={active}
                                >
                                    <span>{category.name}</span>

                                    <span
                                        className={`flex h-5 w-5 items-center justify-center rounded border
                      ${active
                                                ? "border-indigo-600 bg-indigo-600 text-white"
                                                : "border-gray-300"
                                            }`}
                                    >
                                        {active && <Check size={14} />}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
};

export default CategoryDropdown;
