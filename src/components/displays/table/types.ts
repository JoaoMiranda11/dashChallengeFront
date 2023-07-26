import { Dispatch, ReactNode, SetStateAction } from "react";

type Actions = {
    handleSwitchLoading: (newState?: boolean) => void;
    handleRemove: () => Promise<void>;
}

export type TableDataTypes = string | number | null | undefined
export type TableDataObject = Record<string, TableDataTypes> & {id: string | number};

export type ColumnsProps = {
    name: string;
    placeholder?: ReactNode;
    contentMask?: (content: TableDataObject, actions: Actions) => ReactNode;
    action?: (content: TableDataObject) => void;
    defaultValue?: ReactNode;
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    position?: "center" | "start" | "end";
}

export type TableProps = {
    columns: Record<string, ColumnsProps>;
    data: TableDataObject[];
    setData: Dispatch<SetStateAction<TableDataObject[]>>
    minWidth?: string | number;
    minHeight?:  string | number;
    maxHeight?: string | number;
    maxRows?: number;
}