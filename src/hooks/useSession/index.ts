"use client"
import { sessionActions } from "@/redux/slices/auth.slice";
import { UserData } from "@/types/auth/interface";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../useStore";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useSession() {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const session = useAppSelector((state) => state.session)

    const refresh = useCallback(async () => {
        const res = await axios.get("http://localhost:3000/api/auth/session");
        if (res.status === 200 && res.data) {
            dispatch(sessionActions.setSession({
                data: res.data.data as UserData,
                status: res.data.status
            }))
            return;
        }
        dispatch(sessionActions.setSession({
            data: null,
            status: "unauthenticated"
        }))
    }, [dispatch])

    const singIn = useCallback(async (data: {username: string, password: string}) => {
        const res = await axios.post("http://localhost:3000/api/auth/login", data);
        if (res?.data?.success) {
            await refresh();
            router.push("/")
            return true;
        }
        return false;
    }, [refresh, router])

    const logOut = useCallback(async () => {
        const res = await axios.delete("http://localhost:3000/api/auth/session");
        if (res.status === 200 && res.data) {
            dispatch(sessionActions.setSession({
                data: null,
                status: "unauthenticated"
            }))
            router.push("/login")
            return true;
        }
        return false;
    }, [dispatch, router])
    
    return { refresh, logOut, singIn, ...session }
}