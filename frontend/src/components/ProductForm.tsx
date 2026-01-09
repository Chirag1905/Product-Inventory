"use client";

import { useMutation } from "@apollo/client/react";
import { Save, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GraphQLError } from "graphql";
import { CREATE_PRODUCT } from "../graphql/mutations";
import CategoryDropdown from "./CategoryDropdown";
import { GET_PRODUCTS } from "../graphql/queries";

// ---------- Types ----------
type FormState = {
    name: string;
    description: string;
    quantity: number;
    categoryIds: number[];
};

type Errors = {
    name?: string;
    quantity?: string;
    categoryIds?: string;
    description?: string;
};

type ProductFormProps = {
    onCreated?: () => void;
    onClose?: () => void;
};

// ---------- Component ----------
type CreateProductResult = {
    createProduct: {
        message?: string;
    };
};

const ProductForm: React.FC<ProductFormProps> = ({
    onCreated,
    onClose,
}) => {
    const [createProduct, { loading }] = useMutation<CreateProductResult>(
        CREATE_PRODUCT,
        {
            refetchQueries: [
                {
                    query: GET_PRODUCTS,
                    variables: {
                        page: 1,
                        limit: 5,
                        search: "",
                        categoryIds: [],
                    },
                },
            ],
            awaitRefetchQueries: true,
        }
    );


    const initialFormState: FormState = {
        name: "",
        description: "",
        quantity: 0,
        categoryIds: [],
    };
    const [form, setForm] = useState<FormState>(initialFormState);
    const [errors, setErrors] = useState<Errors>({});

    const submit = async (): Promise<void> => {
        setErrors({});

        try {
            const { data } = await createProduct({
                variables: form,
            });
            toast.success(data?.createProduct?.message ?? "Product created successfully");
            setForm(initialFormState);
            setErrors({});
            onCreated?.();
            onClose?.();
        } catch (err: unknown) {
            const gqlError = (err as { errors?: GraphQLError[] })?.errors?.[0];

            if (gqlError?.extensions?.code === "BAD_USER_INPUT") {
                type FieldErrors = {
                    name?: string[];
                    description?: string[];
                    quantity?: string[];
                    categoryIds?: string[];
                };
                const fieldErrors: FieldErrors = gqlError.extensions.details || {};

                setErrors({
                    name: fieldErrors.name?.[0],
                    description: fieldErrors.description?.[0],
                    quantity: fieldErrors.quantity?.[0],
                    categoryIds: fieldErrors.categoryIds?.[0],
                });
                toast.error("You might be missing required fields");
                return;
            }

            toast.error(gqlError?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex h-full flex-col overflow-auto bg-gray-50 px-6 py-10">
            <div className="mx-auto w-full max-w-2xl">
                <div className="space-y-6 rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                    {/* Header */}
                    <div className="border-b px-8 py-5">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Add Product
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Fill in product details and assign categories
                        </p>
                    </div>

                    <div className="space-y-6 px-8">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <input
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-sm
                  ${errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                placeholder="Enter product name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                                className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-sm
      ${errors.description ? "border-red-500" : "border-gray-300"}
      focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                placeholder="Enter description"
                            />

                            {errors.description && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>

                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={form.quantity || ""}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");

                                    if (value.length > 3) return;

                                    setForm({
                                        ...form,
                                        quantity: value === "" ? 0 : Number(value),
                                    });
                                }}
                                className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-sm
      ${errors.quantity ? "border-red-500" : "border-gray-300"}
      focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                placeholder="Enter quantity"
                            />

                            {errors.quantity && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.quantity}
                                </p>
                            )}
                        </div>


                        {/* Categories */}
                        <CategoryDropdown
                            label="Categories"
                            selected={form.categoryIds}
                            onChange={(v) =>
                                setForm({ ...form, categoryIds: v })
                            }
                            error={errors.categoryIds}
                            fullWidth
                        />
                    </div>

                    {/* Footer */}
                    <div className="border-t px-8 py-5">
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={submit}
                                disabled={loading}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl
                  bg-indigo-600 py-3 text-sm font-medium text-white
                  transition hover:bg-indigo-700 disabled:opacity-50"
                            >
                                <Save size={16} />
                                Save Product
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setForm(initialFormState);
                                    setErrors({});
                                    onClose?.();
                                }}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl
                  border border-gray-300 py-3 text-sm font-medium text-gray-700
                  transition hover:bg-gray-50"
                            >
                                <X size={16} />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;