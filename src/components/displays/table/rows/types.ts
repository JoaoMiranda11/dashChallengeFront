import { ColumnsProps, TableDataObject } from "../types";

export type RowComponentProps = {row: TableDataObject, columns: Record<string, ColumnsProps>, index: number, removeRow: (index: number) => void}