import { Dispatch, ReactNode, SetStateAction } from "react";

type Actions = {
    handleSwitchLoading: (newState?: boolean) => void;
    handleRemove: () => Promise<void>;
}

export type TableDataTypes = string | number | null | undefined
export type TableDataObject = Record<string, TableDataTypes> & {id: string | number};

export type ColumnsProps = {
    name: string;
    hideOnMobile?: boolean;
    placeholder?: ReactNode;
    contentMask?: (props: {
        row: TableDataObject;
        actions: {
            handleSwitchLoading: (newState?: boolean) => void;
            handleRemove: () => Promise<void>;
        };
        pageIndex: number;
        index: number;
    }) => ReactNode;
    action?: (content: TableDataObject) => void;
    defaultValue?: ReactNode;
    style?: {
        height?: string | number;
        minHeight?: string | number;
        maxHeight?: string | number;
        width?: string | number;
        minWidth?: string | number;
        maxWidth?: string | number;
        textAlign?: "center" | "start" | "end";
    }
}

export type TableProps = {
    columns: Record<string, ColumnsProps>;
    maxRows?: number;
    style?: {
        height?: string | number;
        minHeight?: string | number;
        maxHeight?: string | number;
        width?: string | number;
        minWidth?: string | number;
        maxWidth?: string | number;
        textAlign?: "center" | "start" | "end";
    }
}