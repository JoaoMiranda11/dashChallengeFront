"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useQueryParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const current = useMemo(() => {
        return new URLSearchParams(Array.from(searchParams.entries()))
    }, [searchParams])
    
    const addQueryParams = useCallback((key: string, value: string) => {
        if (!value) {
            current.delete(key);
        } else {
            current.set(key, value);
        }

        const search = current.toString();
        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`);
    }, [current, pathname, router])

    return { addQueryParams, current }
}