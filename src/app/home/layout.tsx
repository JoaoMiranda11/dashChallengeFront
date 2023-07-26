import { Header } from "@/components/layout/header";
import { ReactNode } from "react";

export default function Layout({ children }: {children: ReactNode}) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between p-24" >
        {children}
      </main>
    </>
  )
}