"use client"

import { TextInput } from "@/components/inputs/controlledTextInput";
import { useForm } from 'react-hook-form'
import type { FormLoginProps } from "./types";
import { toast } from "react-toastify";
import { Button } from "@/components/inputs/button";
import { useSession } from "@/hooks/useSession";
import { useCallback, useState } from "react";
import styles from './styles.module.css'

export default function Login() {
    const [ loading, setLoading ] = useState(false);
    const { handleSubmit, control } = useForm<FormLoginProps>();
    const { singIn } = useSession()

    const submit = useCallback(async (data: FormLoginProps) => {
        setLoading(true)
        const result = await singIn(data)
        if (!result) {
            toast.error("Credentials failed!")
            setLoading(false)
            return;
        }
    }, [singIn])
    
    return (
        <main className={styles.pageLayout}>
            <div className={styles.formArea}>
                <div className={styles.session} >
                    <div className={styles.background} />
                </div>
                <form className={styles.form} onSubmit={handleSubmit(submit)}>
                    <TextInput control={control} name="username" label="Username" required regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/} />
                    <TextInput control={control} name="password" label="Password" type="password" required />
                    <div className="flex items-center justify-center">
                        <Button type="submit" loading={loading}>
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}