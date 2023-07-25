"use client"
import { Header } from "@/components/layout/header";
import { useSession } from "@/hooks/useSession";
import { useCallback } from "react";

export default function Home() {
  const { data, refresh } = useSession();

  const getSession = useCallback(async () => {
    refresh()
    console.log(data);
  }, [ data, refresh ])

  return (
    <div>
        <button onClick={getSession}>teste</button>
    </div>
  )
}
