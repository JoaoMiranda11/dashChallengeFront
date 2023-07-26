"use client"

import { ColumnsProps, TableDataObject, TableDataTypes } from "../types";
import {memo} from 'react'

function RowComponent({row, columns}:{row: TableDataObject, columns: Record<string, ColumnsProps>}) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
            {
                Object.keys(columns).map((key, index) => {
                    const column = columns[key];
                    const data: TableDataTypes = row[key];
                    return (
                        <td className="px-6 py-4" key={index} onClick={() => column.action?.(row)} >
                            {column.defaultValue || column.contentMask?.(row) || data || column.placeholder}
                        </td>
                    )   
                })
            }
        </tr>
    )
}

export const Row = memo(RowComponent)