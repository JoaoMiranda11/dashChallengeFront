"use client"

import { ModalFunctions } from "@/components/displays/modal";
import { Table } from "@/components/displays/table"
import { TableButton, TableRowButtonArea } from "@/components/displays/table/buttons";
import type { ColumnsProps, TableDataObject } from "@/components/displays/table/types"
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import style from './style.module.css'
import { EditModal } from "./components/editModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryParams } from "@/hooks/queryParams";

const tableData: TableDataObject[] = [
  {
    name: "Miranda",
    age: 42,
    email: "admin@a.com",
    avatar: "admin",
    id: 0
  },
  {
    name: "João",
    age: 24,
    email: "jsm2.pe@gmail.com",
    avatar: "joaoMiranda",
    id: 1
  },
  {
    name: "Miranda",
    age: 43,
    email: "admin@a.com",
    avatar: "admin",
    id: 2
  },
  {
    name: "Miranda",
    age: 44,
    email: "admin@a.com",
    avatar: "admin",
    id: 3
  },
  {
    name: "Miranda",
    age: 45,
    email: "admin@a.com",
    avatar: "admin",
    id: 4
  },
  {
    name: "Miranda",
    age: 46,
    email: "admin@a.com",
    avatar: "admin",
    id: 5
  },
  {
    name: "Miranda",
    age: 47,
    email: "admin@a.com",
    avatar: "admin",
    id: 6
  },
  {
    name: "Miranda",
    age: 47,
    email: "admin@a.com",
    avatar: "admin",
    id: 7
  },
  {
    name: "Miranda",
    age: 49,
    email: "admin@a.com",
    avatar: "admin",
    id: 9
  }
]

export default function Home() {
  const { addQueryParams } = useQueryParams();
  const [data, setData] = useState(tableData);
  const editModalRef = useRef<ModalFunctions>(null);

  const columns: Record<string, ColumnsProps> = {
    "name": {
      name: "Nome",
      width: 200,
    },
    "age": {
      name: "Idade",
      width: 100,
    },
    "email": {
      name: "Email",
      width: 200,
      maxWidth: 200,
    },
    "avatar": {
      name: "Avatar",
      maxWidth: 100,
    },
    "actions": {
      name: "Ações",
      minWidth: 200,
      position: "center",
      contentMask(content, actions) {
        return (
          <TableRowButtonArea>
            <TableButton onClick={() => {
              actions.handleSwitchLoading(true);
              setTimeout(() => actions.handleSwitchLoading(false), 6000);
            }}>
              <Image src="icons/misc.svg" width={20} height={20}
                alt="load"
              />
            </TableButton>
            <TableButton onClick={() => {
              addQueryParams("id", `${content.id}`)
              editModalRef.current?.switchVisibility()
            }}>
            <Image src="icons/edit.svg" width={20} height={20}
                alt="edit"
              />
            </TableButton>
            <TableButton onClick={() => {
              actions.handleRemove()
            }}>
              <Image src="icons/trash.svg" width={20} height={20}
                alt="delete"
              />
            </TableButton>
          </TableRowButtonArea>
        )
      }
    }
  }

  return (
    <div className={style.page} >
      <EditModal modalRef={editModalRef} />
      <Table columns={columns} data={data} setData={setData} minWidth={620} minHeight={432} maxHeight={432} maxRows={6} />
    </div>
  )
}
