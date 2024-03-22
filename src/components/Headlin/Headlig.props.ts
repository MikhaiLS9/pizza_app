import { HTMLAttributes, ReactNode } from "react";

export interface HeadlinProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}
