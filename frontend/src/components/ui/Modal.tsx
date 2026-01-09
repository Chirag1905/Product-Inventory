"use client";

import { useCallback } from "react";
import { X } from "lucide-react";

export interface ModalProps {
    open: boolean;
    title: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, title, onClose, children }) => {
    const handleBackdropClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        [onClose]
    );

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h3
                        id="modal-title"
                        className="text-lg font-semibold text-gray-900"
                    >
                        {title}
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded-md p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
