import { DetailedHTMLProps, HTMLAttributes } from 'react'
import style from './style.module.css'

export function CircularLoader({styles}:{styles?: {width?: string | number, height?: string | number}}) {
    return (
        <div className={style.loader} style={styles} >
            <svg className={style.circle} viewBox="25 25 50 50">
                <circle className={style.path} cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
        </div>
    )
}