"use client"

import { TextInput } from "@/components/inputs/controlledTextInput";
import { useForm } from 'react-hook-form'
import type { FormLoginProps } from "./types";
import { toast } from "react-toastify";
import { Button } from "@/components/inputs/button";
import { useSession } from "@/hooks/useSession";
import { useCallback, useState } from "react";

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
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(submit)}>
                    <TextInput control={control} name="username" label="Username" required regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/} />
                    <TextInput control={control} name="password" label="Password" hide required />
                    <div className="flex items-center justify-center">
                        <Button type="submit" disabled={loading}>
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}