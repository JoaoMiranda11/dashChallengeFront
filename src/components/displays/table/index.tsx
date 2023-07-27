"use client"

import { Row } from "./rows";
import { TableDataObject, TableProps } from "./types"
import styles from './style.module.css'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react";
import { TableButton } from "./buttons";
import { toast } from "react-toastify";

const ADD_ANIMATION_DELAY = 500;

export type TableFunctions = {
    removeRow: (index: number) => void;
    setTableData: (tableData: TableDataObject[]) => void;
    addRow: (newData: TableDataObject) => void;
    changeRow: (index: number, tableData: TableDataObject) => void;
}

export const Table = forwardRef<TableFunctions, TableProps>(function TableComponent({columns, style, maxRows=0}, tableRef) {
    const [data, setData] = useState<TableDataObject[]>([]);
    const [page, setPage] = useState(0);
    const [newRowAnimation, setNewRowAnimation] = useState(false);
    const pagesNumber = useMemo(() => {
        if (!maxRows) return [];
        return Array.from(Array(Math.ceil(data.length / maxRows)), (_, index) => index + 1)
    }, [data.length, maxRows])
    const pageRows = useMemo(() => {
        if (!maxRows) return data;
        const sliceRows = data.slice(page * maxRows, (page + 1) * maxRows );
        return sliceRows
    }, [data, maxRows, page])

    const addRow = useCallback((newData: TableDataObject) => {
        setNewRowAnimation(true)
        setData(prev => [newData, ...prev])
        setTimeout(() => setNewRowAnimation(false), ADD_ANIMATION_DELAY)
    }, [setData])

    const removeRow = useCallback((index: number) => {
        if (data.length <= index) {
            toast.error("Não foi possível encontrar o item a ser excluído!")
            return;
        }
        if (pageRows.length == 1 && page > 0) {
            setPage(prev => prev - 1)
        }
        data.splice(index, 1)
        setData([...data])
    }, [data, page, pageRows.length, setData])

    const setTableData = useCallback((tableData: TableDataObject[]) => {
        setData(tableData)
    }, [])

    const changeRow = useCallback((index: number, tableData: TableDataObject) => {
        if (data.length <= index) {
            toast.error("Não foi possível encontrar o item a ser editado!")
            return;
        }
        const updatedItems = [...data];
        updatedItems[index] = tableData;
        setData(updatedItems)
    }, [data])

    useImperativeHandle(tableRef, () => {
        return {
            setTableData,
            removeRow,
            addRow,
            changeRow
        };
    }, [addRow, changeRow, removeRow, setTableData]);

    return (
        <div className={styles.tableContainer} style={style}>
            <table className={styles.tableArea} >
                <thead >
                    <tr >
                        {
                            Object.keys(columns).map((key, index) => {
                                const column = columns[key];
                                return (
                                    <th className={`${column.hideOnMobile ? "hideMobile" : ""}`} scope="col" key={`${column.name}-${index}`} style={{textAlign: column.style?.textAlign}}>
                                        {column.name}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        pageRows.map((row, pageIndex) => {
                            const index = pageIndex + (page * maxRows);
                            return (
                                <Row row={row} newRowAnimate={newRowAnimation && index == 0} columns={columns} key={`${index}-${page}-${columns["id"]}`} index={index} pageIndex={pageIndex} removeRow={removeRow} addRow={addRow} />
                            )
                        })
                    }
                </tbody>
            </table>
            {
                pageRows.length === 0 && (
                    <p className={styles.notFoundData}>
                        Nenhum dado encontrado!
                    </p>
                )
            }
            {
                (maxRows && maxRows < data.length ) && (
                    <div className={styles.paginationBox}>
                        {
                            pagesNumber.map((p) => {
                                return (
                                    <TableButton key={p} onClick={() => {setPage(p - 1)}} selected={(p - 1) == page} >
                                        {p}
                                    </TableButton>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
})