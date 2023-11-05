import { CartServices } from "../Cart/services";
import { useStateProgressContext } from "@/app/contexts/progress";
import { Product } from "@/app/types";
import React from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

export default function PurchaseButton(product: Product) {
  const { progress, state } = useStateProgressContext();
  const { addItem } = CartServices();
  return (
    <button
      type="button"
      onClick={() => addItem(product, 1)}
      className="button-success"
    >
      <span>Comprar</span>
      {state == `addItem${product.id}` ? (
        progress
      ) : (
        <MdOutlineShoppingCartCheckout className="text-extrabold font-lg" />
      )}
    </button>
  );
}
