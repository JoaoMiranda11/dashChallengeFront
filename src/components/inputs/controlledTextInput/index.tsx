"use client"
import { useRef, useCallback, ChangeEvent } from 'react'
import type { TextInputProps, onChangeFunc } from "./types"
import { Controller } from 'react-hook-form'

const normal = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
const error = "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"

export const TextInput = ({label, placeholder, name, defaultValue="", required, regex, hide, control, status, onChange}:TextInputProps) => {
    const type = hide ? "password" : "text";

    function getStyle(status?: string) {
        switch (status) {
            case "error":
                return error;
            default:
                return normal
        }
    }

    const checkRegex = useCallback((value: string) => {
        if (regex && !regex.test(value)) {
            return false
        }
        return true;
    }, [regex])

    return (
        <div className="mb-4">
            {
                label && (
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`${name}-input`}>
                        {label}
                    </label>
                )
            }
            <Controller control={control} name={name} defaultValue={defaultValue} rules={{required: required, pattern: regex}}
                render={({field, fieldState}) => {
                    if (onChange) {
                        field.onChange = (ev: ChangeEvent<HTMLInputElement>) => {
                            if (checkRegex(ev.target.value)) {
                                field.onChange(ev)
                                onChange(ev)
                            } 
                        }
                    }
                    return (
                        <input required={required} {...field} type={type} className={getStyle(fieldState.error ? "error" : status)} id={name} placeholder={placeholder} />
                    )
                }}
            />
        </div>
    )
}

