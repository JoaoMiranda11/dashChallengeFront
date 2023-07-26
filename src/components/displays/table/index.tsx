"use client"

import { Row } from "./rows";
import { TableProps } from "./types"
import style from './style.module.css'
import { memo, useCallback, useMemo, useState } from "react";
import { TableButton } from "./buttons";
import { toast } from "react-toastify";

export const Table = memo(function TableComponent({columns, data=[], setData, minWidth, minHeight, maxHeight, maxRows=0}:TableProps) {
    const [page, setPage] = useState(0);
    const pagesNumber = useMemo(() => {
        if (!maxRows) return [];
        return Array.from(Array(Math.ceil(data.length / maxRows)), (_, index) => index + 1)
    }, [data.length, maxRows])
    const pageRows = useMemo(() => {
        if (!maxRows) return data;
        return data.slice(page * maxRows, page + 1 * maxRows )
    }, [data, maxRows, page])

    const RemoveRow = useCallback((index: number) => {
        if (data.length <= index) {
            toast.error("Não foi possível encontrar o item a ser excluído!")
            return;
        }
        data.splice(index, 1)
        setData([...data])
    }, [data, setData])

    return (
        <div className={style.tableContainer} style={{minWidth, minHeight, maxHeight}}>
            <table className={style.tableArea} >
                <thead >
                    <tr>
                        {
                            Object.keys(columns).map((key, index) => {
                                const column = columns[key];
                                return (
                                    <th scope="col" key={`${column.name}-${index}`} style={{textAlign: column.position}}>
                                        {column.name}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        pageRows.map((row, index) => {
                            return (
                                <Row row={row} columns={columns} key={`${index}-${page}-${columns["id"]}`} index={index + (page * maxRows)} removeRow={RemoveRow} />
                            )
                        })
                    }
                </tbody>
            </table>
            {
                pageRows.length === 0 && (
                    <p className={style.notFoundData}>
                        Nenhum dado encontrado!
                    </p>
                )
            }
            {
                (maxRows && maxRows < data.length ) && (
                    <div className={style.paginationBox}>
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