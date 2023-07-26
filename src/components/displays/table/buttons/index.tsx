"use client"

import {ReactNode} from 'react';
import style from './style.module.css'
import type { TableButtonProps } from './types';

export function TableButton({children, selected, onClick}: TableButtonProps) {
    return (
        <button className={`${style.tableButton} ${selected && style.selected}`} onClick={onClick}>
            {children}
        </button>
    )
}

export function TableRowButtonArea({children}: {children: ReactNode}) {
    return (
        <div className={style.buttonArea}>
            {children}
        </div>
    )
}