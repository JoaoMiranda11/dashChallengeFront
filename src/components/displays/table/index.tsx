"use client"

import { Row } from "./rows";
import { TableProps } from "./types"

export function Table({columns, data=[]}:TableProps) {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" >
                <tr>
                    {
                        Object.keys(columns).map((key, index) => {
                            const column = columns[key];
                            return (
                                <th scope="col" className="px-6 py-3" key={`${column.name}-${index}`}>
                                    {column.name}
                                </th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row, index) => {
                        return (
                            <Row row={row} columns={columns} key={index} />
                        )
                    })
                }
            </tbody>
        </table>
    )
}