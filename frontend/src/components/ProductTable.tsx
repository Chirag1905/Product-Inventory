"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import toast from "react-hot-toast";
import { PlusCircle, Search, Trash2 } from "lucide-react";

import { GET_PRODUCTS } from "../graphql/queries";
import { DELETE_PRODUCT } from "../graphql/mutations";
import Pagination from "./Pagination";
import CategoryDropdown from "./CategoryDropdown";
import TableSkeleton from "./ui/Skeleton";

/* ================= TYPES ================= */

type Product = {
    id: number;
    name: string;
    categories: {
        id: number;
        name: string;
    }[];
};

type ProductsData = {
    products: {
        products: Product[];
        pagination: {
            page: number;
            totalPages: number;
        };
    };
};

type ProductTableProps = {
    onAdd: () => void;
};

/* ================= COMPONENT ================= */

const ProductTable: React.FC<ProductTableProps> = ({ onAdd }) => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [categoryIds, setCategoryIds] = useState<number[]>([]);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const limit = 5;

    const { data, loading, refetch } = useQuery<ProductsData>(GET_PRODUCTS, {
        variables: { page, limit, search, categoryIds },
        fetchPolicy: "network-only",
    });

    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    const products = data?.products?.products ?? [];
    const pagination = data?.products?.pagination ?? {
        page: 1,
        totalPages: 1,
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            setIsDeleting(true);
            await deleteProduct({ variables: { id: deleteId } });
            toast.success("Product deleted");
            setDeleteId(null);
            refetch();
        } catch {
            toast.error("Failed to delete product");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="overflow-visible rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                {/* ================= HEADER ================= */}
                <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Products</h2>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {/* Search */}
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <CategoryDropdown
                            selected={categoryIds}
                            onChange={(v) => {
                                setCategoryIds(v);
                                setPage(1);
                            }}
                        />

                        <button
                            onClick={onAdd}
                            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                            <PlusCircle size={16} />
                            Add Product
                        </button>
                    </div>
                </div>

                {/* ================= TABLE ================= */}
                <div className="overflow-x-auto rounded-b-2xl border-t border-gray-200">
                    <table className="min-w-full border border-collapse text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                {["SR No.", "Name", "Categories", "Actions"].map((h) => (
                                    <th
                                        key={h}
                                        className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 border-r last:border-r-0 border-gray-200"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <TableSkeleton rows={limit} />
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-500">
                                        No products found
                                    </td>
                                </tr>
                            ) : (
                                products.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-center font-medium text-gray-900 border-r last:border-r-0 border-gray-100">
                                            {(page - 1) * limit + index + 1}
                                        </td>

                                        <td className="px-6 py-4 text-center font-medium text-gray-900 border-r last:border-r-0 border-gray-100">
                                            {product.name}
                                        </td>

                                        <td className="px-6 py-4 text-center border-r last:border-r-0 border-gray-100">
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {product.categories.map((c) => (
                                                    <span
                                                        key={c.id}
                                                        className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                                                    >
                                                        {c.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-center border-r last:border-r-0 border-gray-100">
                                            <button
                                                onClick={() => setDeleteId(product.id)}
                                                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    onChange={setPage}
                />
            </div>

            {/* ================= DELETE MODAL ================= */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Delete Product
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to delete this product?
                            This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductTable;
