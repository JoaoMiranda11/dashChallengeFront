import { ReactNode } from "react";

export type TableDataTypes = string | number | null | undefined
export type TableDataObject = Record<string, TableDataTypes>;

export type ColumnsProps = {
    name: string;
    placeholder?: ReactNode;
    contentMask?: (content: TableDataObject) => ReactNode;
    action?: (content: TableDataObject) => void;
    defaultValue?: ReactNode;
}

export type TableProps = {
    columns: Record<string, ColumnsProps>;
    data: TableDataObject[];
}