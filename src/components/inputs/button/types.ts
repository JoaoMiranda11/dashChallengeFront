import { ReactNode } from "react";

export type ButtonProps = {children: ReactNode, type?: "submit" | "button" | "reset", onClick?: () => void, disabled?: boolean, loading?: boolean }