"use client"

import { Table } from "@/components/displays/table"
import { ColumnsProps, TableDataObject } from "@/components/displays/table/types"

const columns: Record<string, ColumnsProps> = {
  "name": {
    name: "Nome",
  },
  "age": {
    name: "Idade",
  },
  "email": {
    name: "Email",
  },
  "avatar": {
    name: "Avatar",
  },
  "actions": {
    name: "Ações",
    contentMask(content) {
      function x() {
        console.log(content["id"]);
      }
      return (
        <div>
          <div onClick={x}>editar</div>
          <div onClick={x}>excluir</div>
        </div>
      )
    }
  }
}

const data: TableDataObject[] = [
  {
    name: "João",
    age: 24,
    email: "jsm2.pe@gmail.com",
    avatar: "joaoMiranda",
    id: 1
  },
  {
    name: "Miranda",
    age: 42,
    email: "admin@a.com",
    avatar: "admin",
    id: 0
  }
]

export default function Home() {
  return (
    <div>
        <Table columns={columns} data={data} />
    </div>
  )
}
