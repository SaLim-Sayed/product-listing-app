"use client";

 import { Button, Modal, useOverlayState } from "@heroui/react";
import { useCartStore } from "@/lib/cart/cart-store";
import { promoListAndSave } from "@/lib/cart/promo-pricing";
import type { Product } from "@/lib/types/product";

const QTY = 1;

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function AddToCartModal({ product, onClose }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const state = useOverlayState({
    isOpen: product != null,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });

  if (product == null) {
    return null;
  }

  const { youSave } = promoListAndSave(product.price);
  const lineTotal = product.price * QTY;

  return (
    <Modal state={state}>
      <Modal.Backdrop isDismissable>
        <Modal.Container placement="center" scroll="inside" size="md">
          <Modal.Dialog className="sm:max-w-[360px] overflow-hidden rounded-xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Add to Cart</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm leading-relaxed text-zinc-800">
                Are you sure you want to add {QTY}{" "}
                <span className="font-medium">{product.title}</span> to your
                cart?
              </p>
              <p className="mt-4 text-sm">
                <span className="font-bold text-zinc-900">
                  Total: ${lineTotal.toFixed(2)}
                </span>{" "}
                <span className="font-medium text-emerald-600">
                  (You save ${youSave.toFixed(2)})
                </span>
              </p>
            </Modal.Body>
            <Modal.Footer className="flex flex-row flex-wrap justify-end gap-2">
              <Button variant="ghost" onPress={() => state.close()}>
                Cancel
              </Button>
              <Button
                className="min-w-24 bg-violet-600 font-semibold text-white hover:bg-violet-700"
                onPress={() => {
                  addItem(product);
                  state.close();
                }}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
