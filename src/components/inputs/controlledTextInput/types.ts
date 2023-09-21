import { Dispatch, SetStateAction } from "react";
import { ChangeEvent } from 'react'

export type onChangeFunc = ((ev: ChangeEvent<HTMLInputElement>) => void)

export type TextInputProps = {
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    required?: boolean;
    status?: "error" | "success" | "default";
    type?: string;
    regex?: RegExp;
    control?: any;
    onChange?: onChangeFunc
    name: string;
}
