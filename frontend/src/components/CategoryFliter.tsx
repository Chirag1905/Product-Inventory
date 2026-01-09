"use client";

import { useCallback } from "react";
import { useQuery } from "@apollo/client/react";

import { GET_CATEGORIES } from "../graphql/queries";

// ---------- Props ----------
export interface CategoryFilterProps {
    selected: string[];
    onChange: (value: string[]) => void;
}

interface Category {
    id: number | string;
    name: string;
}

interface GetCategoriesData {
    categories: {
        categories: Category[];
    };
}

// ---------- Component ----------
const CategoryFilter: React.FC<CategoryFilterProps> = ({
    selected,
    onChange,
}) => {
    const { data, loading } = useQuery<GetCategoriesData>(GET_CATEGORIES);

    const toggle = useCallback(
        (id: string) => {
            onChange(
                selected.includes(id)
                    ? selected.filter((x) => x !== id)
                    : [...selected, id]
            );
        },
        [onChange, selected]
    );

    if (loading || !data) return null;

    const categories = data.categories.categories;

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
                const active = selected.includes(String(category.id));

                return (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => toggle(String(category.id))}
                        className={`chip transition-transform
              ${active
                                ? "bg-indigo-600 text-white border-indigo-600 scale-105"
                                : "bg-white hover:bg-indigo-50 hover:border-indigo-300"
                            }`}
                        aria-pressed={active}
                    >
                        {category.name}
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryFilter;
