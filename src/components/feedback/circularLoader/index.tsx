import style from './style.module.css'

export function CircularLoader() {
    return (
        <div className={style.loader} >
            <svg className={style.circle} viewBox="25 25 50 50">
                <circle className={style.path} cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
        </div>
    )
}