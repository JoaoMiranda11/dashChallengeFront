import { ColumnsProps, TableDataObject } from "../types";

export type RowComponentProps = {
    row: TableDataObject;
    columns: Record<string, ColumnsProps>;
    index: number;
    pageIndex: number;
    newRowAnimate?: boolean;
    removeRow: (index: number) => void;
    addRow: (newData: TableDataObject) => void;
}