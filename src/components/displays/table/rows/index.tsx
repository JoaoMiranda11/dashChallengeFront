"use client"

import { TableDataTypes } from "../types";
import style from './style.module.css'
import {memo, useState} from 'react'
import type { RowComponentProps } from "./types";

const REMOVE_ANIMATION_DELAY = 350;

export const Row = memo(function RowComponent({row, columns, index, removeRow}:RowComponentProps) {
    const [loading, setLoading] = useState(false);
    const [removing, setRemoving] = useState(false);

    function handleSwitchLoading(newState?: boolean) {
        setLoading(prev => newState == undefined ? !prev : newState );
    }

    async function handleRemove() {
        setRemoving(true);
        setTimeout(() => {
            setRemoving(false)
            removeRow(index);
        }, REMOVE_ANIMATION_DELAY)
    }

    const actions = {handleSwitchLoading, handleRemove};

    return (
        <tr className={`${style.tableRow} ${loading ? style.loadingRow : ""} ${removing ? style.removingRow : ""}`} >
            {
                Object.keys(columns).map((key: string, columnIndex: number) => {
                    const column = columns[key];
                    const data: TableDataTypes = row[key];
                    return (
                        <td key={`${columnIndex}-${index}`} 
                            onClick={() => column.action?.(row)}
                            style={{maxWidth: column.maxWidth, minWidth: column.minWidth, width: column.width, textAlign: column.position}} >
                            {column.defaultValue || column.contentMask?.(row, actions) || data || column.placeholder}
                        </td>
                    )   
                })
            }
        </tr>
    )
})