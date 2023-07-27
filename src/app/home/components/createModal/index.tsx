"use client"

import { Modal, ModalFunctions } from "@/components/displays/modal";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/inputs/controlledTextInput";
import { Button } from "@/components/inputs/button";
import { TableDataObject } from "@/components/displays/table/types";
import { UserData } from "../../types";

export function CreateModal({modalRef, addRow}:{modalRef: RefObject<ModalFunctions<UserData>>, addRow: (data: TableDataObject) => void}) {
    const { control, handleSubmit, reset } = useForm<UserData>();

    function submit(data: UserData) {
        addRow({
            ...data,
            id: 1111
        });
        reset();
        modalRef.current?.switchVisibility(false);
    }

    return (
        <Modal ref={modalRef} title="Criar" style={{minHeight: "400px", minWidth: "400px"}} >
            <form onSubmit={handleSubmit(submit)}>
                <TextInput label="Nome" name="name" control={control}  required />
                <TextInput label="Idade" name="age" control={control} required />
                <TextInput label="Email" name="email" control={control} required />
                <TextInput label="Avatar" name="avatar" control={control} required />
                <Button>
                    Criar
                </Button>
            </form>
        </Modal>
    )
}