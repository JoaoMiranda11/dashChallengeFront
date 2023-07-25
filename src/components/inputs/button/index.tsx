import type { ButtonProps } from './types'

export function Button({children, type="submit", disabled, loading, onClick}:ButtonProps) {
    const defaultStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
    const disabledStyle = "bg-blue-900 text-white font-bold py-2 px-4 rounded";

    return (
        <button disabled={disabled || loading} onClick={onClick} className={disabled || loading ? disabledStyle: defaultStyle} type={type}>
            {children}
        </button>
    )
}