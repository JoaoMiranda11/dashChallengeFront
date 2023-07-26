import { ReactNode } from "react";

export interface ModalProps {
    children: ReactNode;
    title: string;
    onClose?: () => void;
    style?: {
        minHeight?: string | number;
        maxHeight?: string | number;
        maxWidth?: string | number;
        minWidth?: string | number;
    }
}