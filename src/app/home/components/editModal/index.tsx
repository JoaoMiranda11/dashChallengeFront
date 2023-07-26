"use client"

import { Modal, ModalFunctions } from "@/components/displays/modal";
import { CircularLoader } from "@/components/feedback/circularLoader";
import { useQueryParams } from "@/hooks/queryParams";
import axios from "axios";
import { RefObject } from "react";
import useSWR from 'swr'

const fetcher = (url: string) => {
    if (url.includes("null")) return;
    return axios.get(url).then((res) => res.data)
}

export function EditModal({modalRef}:{modalRef: RefObject<ModalFunctions>}) {
    const { addQueryParams, current } = useQueryParams();
    const id = current.get("id");
    const {data, error, isLoading} = useSWR(`http://localhost:3001//user/${id}`, fetcher, {shouldRetryOnError: false, })

    if (isLoading) {
        return (
            <Modal ref={modalRef} title="Editar" onClose={() => addQueryParams("id", "")} style={{minHeight: "200px", minWidth: "200px"}} >
                <CircularLoader />
            </Modal>
        )
    }

    if (error) {
        return (
            <Modal ref={modalRef} title="Editar" onClose={() => addQueryParams("id", "")} style={{minHeight: "200px", minWidth: "200px"}} >
                Error
            </Modal>
        )
    }

    return (
        <Modal ref={modalRef} title="Editar" onClose={() => addQueryParams("id", "")} style={{minHeight: "200px", minWidth: "200px"}} >
            {JSON.stringify(data)}
        </Modal>
    )
}