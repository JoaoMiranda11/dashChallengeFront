"use client"

import { TableDataTypes } from "../types";
import styles from './style.module.css'
import { memo, useState} from 'react'
import type { RowComponentProps } from "./types";

const REMOVE_ANIMATION_DELAY = 450;

export const Row = memo(function RowComponent({row, columns, newRowAnimate, index, pageIndex, removeRow, addRow}:RowComponentProps) {
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
        <tr className={`${styles.tableRow} ${newRowAnimate && styles.slideInRow} ${loading ? styles.loadingRow : ""} ${removing ? styles.removingRow : ""}`} >
            {
                Object.keys(columns).map((key: string, columnIndex: number) => {
                    const column = columns[key];
                    const data: TableDataTypes = row[key];
                    const style = column.style;
                    return (
                        <td className={`${column.hideOnMobile ? "hideMobile" : ""}`} key={`${columnIndex}-${index}-${row["id"]}`} 
                            onClick={() => column.action?.(row)}
                            style={style} >
                            {column.defaultValue || column.contentMask?.({row, actions, index, pageIndex}) || data || column.placeholder}
                        </td>
                    )   
                })
            }
        </tr>
    )
})