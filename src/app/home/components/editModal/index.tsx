"use client"

import { Modal, ModalFunctions, useModalContext } from "@/components/displays/modal";
import { RefObject, useCallback } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/inputs/controlledTextInput";
import { Button } from "@/components/inputs/button";
import { UserData } from "../../types";
import { toast } from "react-toastify";

function EditForm({changeRow}:{changeRow: (index: number, data: any) => void}) {
    const { control, handleSubmit } = useForm<UserData & { index: number; }>();
    const { data, switchVisibility } = useModalContext<UserData & { index: number; }>()

    const submit = useCallback((formData: UserData & { index: number; }) => {
        if (data !== null && data?.index !== undefined) {
            changeRow(data.index, formData);
            switchVisibility(false)
        } else {
            toast.error("Houve algum erro ao encontrar dados do usuário!")
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
            <TextInput label="avatar" name="avatar" control={control} defaultValue={data?.avatar} required />
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