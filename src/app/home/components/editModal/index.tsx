"use client"

import { Modal, ModalFunctions, useModalContext } from "@/components/displays/modal";
import { RefObject, useCallback } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/inputs/controlledTextInput";
import { Button } from "@/components/inputs/button";
import { UserData } from "../../types";
import { toast } from "react-toastify";
import axios from "axios";

function EditForm({changeRow}:{changeRow: (index: number, data: any) => void}) {
    const { control, handleSubmit } = useForm<UserData>();
    const { data, switchVisibility } = useModalContext<UserData & { index: number; }>()

    const submit = useCallback(async (formData: UserData) => {
        if (data !== null && data?.index !== undefined) {
            const res = await axios.patch(process.env.NEXT_PUBLIC_BACKEND_URL+"/users", {...formData, id: data._id}, {
                withCredentials: true
            });
            if (!res?.data){
                toast.error("Não foi possível criar usuário!");
                console.error(res)
                return;
            }

            changeRow(data.index, res.data);
            switchVisibility(false)
        } else {
            toast.error("Houve algum erro ao alterar dados do usuário!")
        }
    }, [data, changeRow, switchVisibility])

    if (data === null) {
        return (
            <p>Erro!</p>
        )
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <TextInput label="name" name="name" control={control} defaultValue={data?.name} required />
            <TextInput label="age" name="age" control={control} defaultValue={`${data?.age}`} required />
            <TextInput label="email" name="email" control={control} defaultValue={`${data?.email}`} required />
            <TextInput label="password" type="password" name="password" control={control} defaultValue={data?.password} required />
            <Button>
                Editar
            </Button>
        </form>
    )
}

export function EditModal({modalRef, changeRow}:{modalRef: RefObject<ModalFunctions<UserData & { index: number; }>>, changeRow: (index: number, data: any) => void}) {
    return (
        <Modal {...{ref: modalRef, title: "Editar", onClose: () => modalRef.current?.setModalData(), style: {minHeight: "400px", minWidth: "400px"}}} >
            <EditForm changeRow={changeRow} />
        </Modal>
    )
}