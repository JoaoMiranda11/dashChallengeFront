"use client"

import { ModalFunctions } from "@/components/displays/modal";
import { Table, TableFunctions } from "@/components/displays/table"
import { TableButton, TableRowButtonArea } from "@/components/displays/table/buttons";
import type { ColumnsProps, TableDataObject } from "@/components/displays/table/types"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import style from './style.module.css'
import { EditModal } from "./components/editModal";
import { CreateModal } from "./components/createModal";
import { Button } from "@/components/inputs/button";
import { UserData } from "./types";
import axios from "axios";
import { deleteUser } from "@/services/deleteUser";
import { toast } from "react-toastify";

export default function Home() {
  const [loading, setLoading] = useState(true);
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
    "password": {
      name: "password",
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
              editModalRef.current?.setModalData({...row as unknown as UserData, index} )
              editModalRef.current?.switchVisibility()
            }}>
              <Image src="icons/edit.svg" width={20} height={20}
                alt="edit"
              />
            </TableButton>
            <TableButton onClick={async () => {
              if (!row._id) {
                toast.error("Usuário não encontrado!")
                return;
              }
              actions.handleSwitchLoading(true);
              const result = await deleteUser(`${row._id}`)
              if (result) {
                actions.handleSwitchLoading(false);
                actions.handleRemove();
              }else{
                toast.error("Não foi possível deletar o usuário!")
                actions.handleSwitchLoading(false);
              }
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
    (async () => {
      const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+"/users", {
        withCredentials: true
      });
      if (res?.data && Array.isArray(res.data)) {
        tableRef.current?.setTableData(res.data);
      }
      setLoading(false);
    })()
  }, [])

  return (
    <>
      <div className={style.page} >
        <Button onClick={()=>createModalRef.current?.switchVisibility(true)} >
          Criar
        </Button>
        <Table ref={tableRef} loading={loading} columns={columns} style={{minWidth: 360, minHeight: 432, maxHeight: 432}} maxRows={6} />
      </div>
      <EditModal modalRef={editModalRef} changeRow={(index, data) => tableRef.current?.changeRow(index, data) } />
      <CreateModal addRow={(data) => tableRef.current?.addRow(data)} modalRef={createModalRef} />
    </>
  )
}
