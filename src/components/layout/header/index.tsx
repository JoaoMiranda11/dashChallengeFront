"use client"

import { SkeletonLoader } from "@/components/feedback/skeletonLoader";
import { Button } from "@/components/inputs/button";
import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";

export function Header() {
  const { data, refresh, logOut } = useSession();

  useEffect(() => {
    refresh()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            LOGO
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <span className="font-semibold text-xl tracking-tight">Projeto teste</span>
        </div>
        <div>
            {
                data ?
                    <div>Olá, {data?.name}</div>
                :
                    <div style={{minWidth: "100px", minHeight: "20px"}}><SkeletonLoader /></div>
            }
        </div>
        <div className="ml-10">
            <Button type="submit" onClick={logOut}>
                Sign Out
            </Button>
        </div>
    </nav>
    )
}