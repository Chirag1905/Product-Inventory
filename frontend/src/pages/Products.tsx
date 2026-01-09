"use client";

import { useCallback, useState } from "react";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

const Products: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const openForm = useCallback(() => {
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50">
      <div className="mx-auto w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            📦 Product Inventory
          </h1>
        </div>

        {/* Unified Container */}
        <div
          className="relative h-[calc(100vh-140px)] overflow-hidden"
        >

          {/* TABLE */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${showForm
              ? "-translate-x-full opacity-0 pointer-events-none"
              : "translate-x-0 opacity-100"
              }`}
          >
            <ProductTable
              onAdd={openForm}
            />
          </div>

          {/* FORM */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${showForm
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
              }`}
          >
            <ProductForm
              onCreated={closeForm}
              onClose={closeForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
