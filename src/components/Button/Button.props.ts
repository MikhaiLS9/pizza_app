import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  appearance:
    | "big"
    | "small"
    | "cart"
    | "registration"
    | "increment"
    | "decrement"
    | "delete_item"
    | "clear_cart"
    | "promo"
    | "back_menu";
}
