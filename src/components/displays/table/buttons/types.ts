import { MouseEventHandler, ReactNode } from "react";

export type TableButtonProps = {children: ReactNode, selected?: boolean, onClick: MouseEventHandler<HTMLButtonElement>}