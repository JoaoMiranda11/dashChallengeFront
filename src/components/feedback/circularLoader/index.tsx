import { DetailedHTMLProps, HTMLAttributes } from 'react'
import style from './style.module.css'

export function CircularLoader({styles, variant}:{styles?: {width?: string | number, height?: string | number}, variant?: 1 | 2}) {

    let color;
    switch (variant) {
        case 1:
            color = style.variant1;
            break;
        case 2:
            color = style.variant2;
            break;
        default:
            color = style.variant0;
            break;
    }

    return (
        <div className={style.loader} style={styles} >
            <svg className={style.circle} viewBox="25 25 50 50">
                <circle className={`${style.path} ${variant == 1 && style.variant1}`} cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
        </div>
    )
}