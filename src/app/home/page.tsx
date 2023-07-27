"use client"

import { ModalFunctions } from "@/components/displays/modal";
import { Table, TableFunctions } from "@/components/displays/table"
import { TableButton, TableRowButtonArea } from "@/components/displays/table/buttons";
import type { ColumnsProps, TableDataObject } from "@/components/displays/table/types"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import style from './style.module.css'
import { EditModal } from "./components/editModal";
import { useQueryParams } from "@/hooks/queryParams";
import { CreateModal } from "./components/createModal";
import { Button } from "@/components/inputs/button";
import { UserData } from "./types";

const tableData: TableDataObject[] = [
  {
    name: "João",
    age: 24,
    email: "jsm2.pe@gmail.com",
    avatar: "joaoMiranda",
    id: 0
  },
  {
    name: "Miranda",
    age: 42,
    email: "admin@a.com",
    avatar: "admin",
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
    age: 48,
    email: "admin@a.com",
    avatar: "admin",
    id: 8
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
  const tableRef = useRef<TableFunctions>(null)
  const editModalRef = useRef<ModalFunctions<UserData & {index: number}>>(null);
  const createModalRef = useRef<ModalFunctions<UserData>>(null);

  const columns: Record<string, ColumnsProps> = {
    "name": {
      name: "Nome",
      style: {
        width: 100,
        maxWidth: 300,
      }
    },
    "age": {
      name: "Idade",
      hideOnMobile: true,
      style: {
        width: 100,
      }
    },
    "email": {
      name: "Email",
      hideOnMobile: true,
      style: {
        width: 100,
        maxWidth: 200,
      }
    },
    "avatar": {
      name: "Avatar",
      style: {
        maxWidth: 100,
      }
    },
    "actions": {
      name: "Ações",
      style: {
        minWidth: 100,
        textAlign: "center",
      },
      contentMask({row, actions, index}) {
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
              editModalRef.current?.setModalData({...row as UserData, index} )
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

  useEffect(() => {
    tableRef.current?.setTableData(tableData)
  }, [])

  return (
    <>
      <div className={style.page} >
        <Button onClick={()=>createModalRef.current?.switchVisibility(true)} >
          Criar
        </Button>
        <Table ref={tableRef} columns={columns} style={{minWidth: 360, minHeight: 432, maxHeight: 432}} maxRows={6} />
      </div>
      <EditModal modalRef={editModalRef} changeRow={(index, data) => tableRef.current?.changeRow(index, data) } />
      <CreateModal addRow={(data) => tableRef.current?.addRow(data)} modalRef={createModalRef} />
    </>
  )
}
