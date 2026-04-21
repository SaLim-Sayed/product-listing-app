"use client";

import { useState } from "react";
import { useProduct } from "@/features/products/hooks";

export function useProductDetailLogic(id: string) {
  const { data, isPending, isError, error, refetch } = useProduct(id);
  const [imageFailed, setImageFailed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleImageError = () => setImageFailed(true);
  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  return {
    data,
    isPending,
    isError,
    error,
    refetch,
    imageFailed,
    showAddModal,
    handleImageError,
    openAddModal,
    closeAddModal,
  };
}
